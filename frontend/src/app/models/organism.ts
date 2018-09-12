import {titlecase} from "../dsb-utils";

export class Organism {
  public id: number;
  public commonName: string;
  public genus: string;
  public species: string;
  public familyLatin: string;
  public familyEnglish: string;
  private _color: string;
  public _habitat: string;
  public photoFilename: string;
  public photoText1: string;
  public photoText2: string;
  public photoDate: Date;
  public videoFilename: string;
  public notes: string;

  constructor(sourceObject?: any) {
    if (sourceObject) {
      for (var key in sourceObject) {
        this[key] = sourceObject[key];
      }
    }
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
}
