import {Organism} from "./organism";

export class Fish extends Organism {
  public size: string;

  pluralClassName() {
    return ('Fish')
  }
}
