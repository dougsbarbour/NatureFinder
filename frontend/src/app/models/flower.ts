import {Organism} from "./organism";
import {titlecase} from "../dsb-utils";

export class Flower extends Organism {
  private _bloomingPeriod: string;
  public mapLocations: object[];

  pluralClassName() {
    return ('Flowers')
  }

  public set bloomingPeriod(value) {
    this._bloomingPeriod = value;
  }

  public get bloomingPeriod() {
    return (titlecase(this._bloomingPeriod));
  }
}
