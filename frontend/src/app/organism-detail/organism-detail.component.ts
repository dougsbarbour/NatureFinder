import {Component, Input, OnInit} from '@angular/core';
import {splitCamelCase, titlecase} from "../dsb-utils";
import {SharingService} from "../services/sharing.service";

@Component({
  selector: 'app-organism-detail',
  templateUrl: './organism-detail.component.html',
  styleUrls: ['./organism-detail.component.css']
})
export class OrganismDetailComponent implements OnInit {

  @Input() model;
  @Input() customTemplate;

  constructor(private shared: SharingService) {
  }

  ngOnInit() {
  }

  fieldKeys() {
    return(this.model.sortedDisplayKeys()
      .filter(key => this.model[key])
      .map(key => key[0] == '_' ? key.slice(1) : key));
  }

  splitCamelCase(str) {
    return(titlecase(splitCamelCase(str)))
  }

  hasAudio() {
    return(this.model.audioFilename);
  }

  togglePlayPause(button, audioPlayer) {
    if (audioPlayer.paused || audioPlayer.ended) {
      button.classList.remove("fa-play-circle");
      button.classList.add("fa-pause-circle");
      audioPlayer.play();
    }
    else {
      button.classList.remove("fa-pause-circle");
      button.classList.add("fa-play-circle");
      audioPlayer.pause();
    }
  }

  audioEnded(button) {
    button.classList.remove("fa-pause-circle");
    button.classList.add("fa-play-circle");
  }

}

