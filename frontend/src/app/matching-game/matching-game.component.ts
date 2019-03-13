import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {map} from "rxjs/operators";
import {SharingService} from "../services/sharing.service";
import {Bird} from "../models/bird";
import {Amphibian} from "../models/amphibian";
import {Fish} from "../models/fish";
import {Flower} from "../models/flower";
import {Insect} from "../models/insect";
import {Mammal} from "../models/mammal";
import {Reptile} from "../models/reptile";
import {Tree} from "../models/tree";
import {times, sound} from "../dsb-utils";

@Component({
  selector: 'app-matching-game',
  templateUrl: './matching-game.component.html',
  styleUrls: ['./matching-game.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MatchingGameComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef;
  x;
  y;
  line;
  currentLeft;
  currentRight;
  lefts = [];
  rights = [];
  matches = new Map();
  mouse = new Two.Vector();
  two: Two;
  instructions: Two.Text[] = [];
  boundDrawBackground = this.drawBackground.bind(this);
  boundDrag = this.drag.bind(this);
  boundDragEnd = this.dragEnd.bind(this);
  modelClass;

  constructor(private acRoute: ActivatedRoute, private api: ApiService, private shared: SharingService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.two = new Two({
      fullscreen: false,
      width: this.canvas.nativeElement.clientWidth,
      height: this.canvas.nativeElement.clientHeight
    });
    this.modelClass = this.modelClassToInstantiate(this.acRoute.snapshot.params['modelNamePlural']);
    this.two.appendTo(this.canvas.nativeElement);
    this.getModelData().pipe(
      map((data: any) => {
        let refMap = this.shared.getIncludedMap(data.included);
        return (data.data.map(each => new this.modelClass(each, refMap)))
      }),
    ).subscribe(data => {
      this.boundDrawBackground(data);
    })
  }

  getModelData() {
    return (this.api.get(this.acRoute.snapshot.params['modelNamePlural'], {'random': 5}))
  }

  drawBackground(modelObjects) {
    let rowHeight = this.two.height / modelObjects.length;
    let elementHeight = rowHeight - 10;
    let elementWidth = this.two.width / 4;
    let leftProperty = this.acRoute.snapshot.params['leftProperty'];
    let leftType = this.acRoute.snapshot.params['leftType'];
    let rightProperty = this.acRoute.snapshot.params['rightProperty'];
    let rightType = this.acRoute.snapshot.params['rightType'];
    this.lefts = modelObjects.map(each => {
      return ({modelObject: each})
    });
    this.rights = this.randomize(modelObjects.map(each => {
      return ({modelObject: each})
    }));
    let y = rowHeight / 2;
    this.lefts.forEach(options => {
      options.rectangle = this.two.makeRoundedRectangle(10 + (elementWidth / 2), y, elementWidth, elementHeight, 4);
      options.rectangle.linewidth = 5;
      this.fillRectangle(options.rectangle, options.modelObject, leftType, leftProperty);
      y += rowHeight;
    });
    y = rowHeight / 2;
    this.rights.forEach(options => {
      options.rectangle = this.two.makeRoundedRectangle(this.two.width - (10 + (elementWidth / 2)), y, elementWidth, elementHeight, 4);
      options.rectangle.linewidth = 5;
      this.fillRectangle(options.rectangle, options.modelObject, rightType, rightProperty);
      y += rowHeight;
    });
    this.showInstructions();
    this.two.update();
    this.lefts.forEach(each => {
      each.rectangle._renderer.elem.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.hideInstructions();
        let r = this.lefts.find(each => each.rectangle._renderer.elem == e.target);
        this.processClickOnLeft(r);
      });
    });
    this.rights.forEach(each => {
      each.rectangle._renderer.elem.addEventListener('mousedown', (e) => {
        e.preventDefault();
        this.hideInstructions();
        let r = this.rights.find(each => each.rectangle._renderer.elem == e.target);
        this.processClickOnRight(r);
      });
    });
  }

  fillRectangle(rectangle, modelObject, type, modelProperty) {
    switch (type) {
      case 'image':
        if (modelObject[modelProperty]) {
          let texture = new Two.Texture(modelObject[modelProperty]);
          rectangle.fill = texture;
          texture.image.width = rectangle.width;
          texture.image.height = rectangle.height;
        }
        break;
      case 'text':
        if (modelObject[modelProperty]) {
          let position = rectangle.translation.clone();
          let text = new Two.Text(modelObject[modelProperty], position.x, position.y);
          text.size = 24;
          text.weight = 'bold';
          text.className = 'game-text';
          this.two.add(text);
        }
        break;
      case 'audio':

        break;
    }
  }

  processClickOnLeft(options) {
    if (this.matches.has(options.modelObject))
      return (null);
    let position = options.rectangle.translation.clone();
    this.flash([options.rectangle]);
    this.mouse.set(position.x + (options.rectangle.width / 2), position.y);
    this.currentLeft = options;
    this.line = null;
    window.addEventListener('mousemove', this.boundDrag);
    window.addEventListener('mouseup', this.boundDragEnd);
  }

  processClickOnRight(options) {
    if (this.matches.has(options.modelObject))
      return (null);
    let position = options.rectangle.translation.clone();
    this.flash([options.rectangle]);
    this.mouse.set(position.x - (options.rectangle.width / 2), position.y);
    this.currentRight = options;
    this.line = null;
    window.addEventListener('mousemove', this.boundDrag);
    window.addEventListener('mouseup', this.boundDragEnd);
  }

  processReleaseOnRight(options) {
    if (!this.matches.has(options.modelObject) && this.currentLeft && this.currentLeft.modelObject == options.modelObject) {
      let position = options.rectangle.translation;
      let v1 = this.makePoint(position.x - (options.rectangle.width / 2), position.y);
      this.line.vertices.pop();
      this.line.vertices.push(v1);
      this.matches.set(options.modelObject, [this.currentLeft.rectangle, options.rectangle, this.line]);
      if (this.matches.size == this.lefts.length)
        this.youWin();
      else
        this.flash(this.matches.get(options.modelObject), 2);
    } else {
      this.line.remove();
    }
    this.line = null;
    this.currentLeft = null;
  }

  processReleaseOnLeft(options) {
    if (!this.matches.has(options.modelObject) && this.currentRight && this.currentRight.modelObject == options.modelObject) {
      let position = options.rectangle.translation;
      let v1 = this.makePoint(position.x + (options.rectangle.width / 2), position.y);
      this.line.vertices.pop();
      this.line.vertices.push(v1);
      this.matches.set(options.modelObject, [options.rectangle, this.line, this.currentRight.rectangle]);
      if (this.matches.size == this.lefts.length)
        this.youWin();
      else
        this.flash(this.matches.get(options.modelObject), 2);
    } else {
      this.line.remove();
    }
    this.line = null;
    this.currentRight = null;
  }

  youWin() {
    let winningSound = new sound('assets/audio/GameWinner.mp3');
    let text = new Two.Text('YOU WIN!', this.two.width / 2, this.two.height / 2);
    text.size = 256;
    text.weight = 'bold';
    text.stroke = 'green';
    text.fill = 'yellow';
    this.two.add(text);
    winningSound.play();
    times(10,() => {
      this.matches.forEach((shapes, modelObject) => {
        this.flash(shapes);
      });
      setTimeout(() => {
        this.matches.forEach((shapes, modelObject) => {
          this.stopFlash(shapes);
        });
        winningSound.stop();
        text.remove();
      }, 5000);
    })
  }

  showInstructions() {
    let strings = "Drag an item from\n one side to the matching item\n on the other side".split("\n");
    let modelText = new Two.Text('', this.two.width / 2, this.two.height / 2);
    modelText.size = 46;
    modelText.leading = 70;
    modelText.className = 'game-title-text';
    let y = (this.two.height / 2) - modelText.leading;
    strings.forEach(s => {
      let text = modelText.clone();
      this.instructions.push(text);
      text.value = s;
      text.translation.y = y;
      y += modelText.leading;
      this.two.add(text);
    });
  }

  hideInstructions() {
    this.instructions.forEach(e => e.remove());
  }

  drag(e) {
    e.preventDefault();
    this.x = e.clientX;
    this.y = e.clientY;
    if (!this.line) {
      let v1 = this.makePoint(this.mouse);
      let v2 = this.makePoint(this.x, this.y);
      this.line = this.two.makeLine(v1.x, v1.y, v2.x, v2.y);
      this.line.noFill().stroke = '#333';
      this.line.linewidth = 10;
    } else {
      let v1 = this.makePoint(this.x, this.y);
      this.line.vertices.pop();
      this.line.vertices.push(v1);
    }
  }

  dragEnd(e) {
    e.preventDefault();
    window.removeEventListener('mousemove', this.boundDrag);
    window.removeEventListener('mouseup', this.boundDragEnd);
    this.line._renderer.elem.style.visibility = 'hidden';
    let target = document.elementFromPoint(e.clientX, e.clientY);
    this.line._renderer.elem.style.visibility = 'visible';
    if (this.currentLeft)
      this.stopFlash([this.currentLeft.rectangle]);
    if (this.currentRight)
      this.stopFlash([this.currentRight.rectangle]);
    let r = this.rights.find(each => each.rectangle._renderer.elem == target);
    let l = this.lefts.find(each => each.rectangle._renderer.elem == target);
    if (r) {
      this.processReleaseOnRight(r);
    } else if (l) {
      this.processReleaseOnLeft(l);
    } else {
      this.line.remove();
      this.line = null;
    }
  }

  flash(shapes, seconds?) {
    let count = 0;
    let secondsCount = 0;
    this.two.bind('update', () => {
      count++;
      if (count > 60) {
        count = 0;
        secondsCount++;
      }
      if (count < 30)
        this.turnRed(shapes);
      else
        this.turnBlack(shapes);
      if (secondsCount == seconds)
        this.stopFlash(shapes);
    }).play();
  }

  stopFlash(shapes) {
    this.two.unbind('update', undefined);
    shapes.forEach(each => each.stroke = 'black');
  }

  turnRed(shapes) {
    shapes.forEach(each => each.stroke = 'red');
  }

  turnBlack(shapes) {
    shapes.forEach(each => each.stroke = 'black');
  }

  makePoint(x, y = undefined) {
    if (arguments.length <= 1) {
      y = x.y;
      x = x.x;
    }
    let v = new Two.Vector(x, y);
    return (v);
  }

  randomize(array) {
    let clone = array.slice();
    for (let i = clone.length - 1; i > 0; i -= 1) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = clone[i];
      clone[i] = clone[j];
      clone[j] = temp
    }
    return (clone);
  }

  modelClassToInstantiate(className): void {
    let subclasses = {
      Amphibian: Amphibian,
      amphibian: Amphibian,
      amphibians: Amphibian,
      Bird: Bird,
      bird: Bird,
      birds: Bird,
      Fish: Fish,
      fish: Fish,
      Flower: Flower,
      flower: Flower,
      flowers: Flower,
      Insect: Insect,
      insect: Insect,
      insects: Insect,
      Mammal: Mammal,
      mammal: Mammal,
      mammals: Mammal,
      Reptile: Reptile,
      reptile: Reptile,
      reptiles: Reptile,
      Tree: Tree,
      tree: Tree,
      trees: Tree
    };
    return (subclasses[className]);
  }
}
