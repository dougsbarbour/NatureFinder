import {Organism} from "./organism";

export class Reptile extends Organism {
  public soundClipFilename: string;
  public soundDescription: string;

  pluralClassName() {
    return ('Reptiles')
  }
}
