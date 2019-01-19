import {titlecase} from "../dsb-utils";
import {Medium} from "./medium";
import {MapLocation} from "./mapLocation";

export class Organism {
  public id: number;
  public commonName: string;
  public scientificName: string;
  private _color: string;
  private _habitat: string;
  private _season: string;
  public notes: string;
  public quickFacts: string;
  public media: Medium[];
  public mapLocations: MapLocation[];

  constructor(sourceObject?: any, refMap?: any) {
    if (sourceObject) {
      this.id = sourceObject.id;
      for (var key in sourceObject.attributes) {
        this[key] = sourceObject.attributes[key];
      }
      let classMap = {media: Medium, mapLocations: MapLocation};
      for (var key in sourceObject.relationships) {
        if (sourceObject.relationships[key].data) {
          this[key] = sourceObject.relationships[key].data
            .map(each => new (classMap[key])(refMap.get(each.type).get(each.id)));
        }
      }
    }
  }

  public sortedDisplayKeys() {
    return (['commonName', 'scientificName', '_habitat', '_season', '_color', 'quickFacts', 'notes']);
  }

  public mediaNames() {
    this.media.map(medium => medium.fileName);
  }

  pluralClassName() {
    return ('Organisms')
  }

  public set color(value) {
    this._color = value;
  }

  public get color() {
    return (this._color ? titlecase(this._color) : undefined);
  }

  public set habitat(value) {
    this._habitat = value;
  }

  public get habitat() {
    return (this._habitat ? titlecase(this._habitat) : undefined);
  }

  public habitats() {
    return (this.habitat ? this.habitat.split(',') : ['None'])
  }

  public get season() {
    return (this._season ? titlecase(this._season) : undefined);
  }

  public set season(value) {
    this._season = value;
  }

  public get photoFilename() {
    if (!this.media) return (undefined);
    let medium = this.media.find(each => each.tagName == 'img');
    return (medium ? medium.fileName : undefined);
  }

  public get exportMapLocations() {
    return(this.mapLocations.map(each => [each.xPercentage,each.yPercentage]));
  }
}

Object.defineProperty(Organism.prototype, 'exportMapLocations', {enumerable: true});
