import {Organism} from "./organism";
import {titlecase} from "../dsb-utils";

export class Bird extends Organism {
  public soundClipFilename: string;
  public songDescription: string;
  public _size: string;

  pluralClassName() {
    return ('Birds')
  }

  public set size(value) {
    this._size = value;
  }

  public get size() {
    return (titlecase(this._size));
  }

}
