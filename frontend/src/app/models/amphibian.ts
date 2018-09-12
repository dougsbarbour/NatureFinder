import {Organism} from "./organism";

export class Amphibian extends Organism {
  public soundClipFilename: string;
  public soundDescription: string;

  pluralClassName() {
    return ('Amphibians')
  }
}
