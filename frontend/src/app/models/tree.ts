import {Organism} from "./organism";
import {baseImagePrefix} from "../dsb-utils"

export class Tree extends Organism {
  public treeType: string;
  public leafPosition: string;
  public leafStructure: string;
  public leafType: string;

  get family() {
    return (this.familyLatin + (this.familyEnglish ? ', ' + this.familyEnglish : ""))
  }

  get genusSpecies() {
    return (this.genus + (this.species ? ', ' + this.species : ""))
  }

  static pluralClassName() {
    return ('Trees')
  }

  pluralClassName() {
    return (Tree.pluralClassName())
  }

  static imagePrefix() {
    return (baseImagePrefix + this.pluralClassName().toLowerCase() + '/')
  }

  static deciduousTreeTypeIconFilename() {
    return (this.imagePrefix() + 'deciduousTreeType.png')
  }

  static evergreenTreeTypeIconFilename() {
    return (this.imagePrefix() + 'evergreenTreeType.png')
  }

  static oppositeLeafPositionIconFilename() {
    return (this.imagePrefix() + 'oppositeLeafPosition.png')
  }

  static alternateLeafPositionIconFilename() {
    return (this.imagePrefix() + 'alternateLeafPosition.png')
  }

  static simpleLeafStructureIconFilename() {
    return (this.imagePrefix() + 'simpleLeafStructure.png')
  }

  static compoundLeafStructureIconFilename() {
    return (this.imagePrefix() + 'compoundLeafStructure.png')
  }

  static broadLeafTypeIconFilename() {
    return (this.imagePrefix() + 'broadLeafType.png')
  }

  static needleLeafTypeIconFilename() {
    return (this.imagePrefix() + 'needleLeafType.png')
  }

  static deciduousTreeTypeValue() {
    return ('d')
  }

  static evergreenTreeTypeValue() {
    return ('e')
  }

  static oppositeLeafPositionValue() {
    return ('o')
  }

  static alternateLeafPositionValue() {
    return ('a')
  }

  static simpleLeafStructureValue() {
    return ('s')
  }

  static compoundLeafStructureValue() {
    return ('c')
  }

  static broadLeafTypeValue() {
    return ('b')
  }

  static needleLeafTypeValue() {
    return ('n')
  }

  iconForTreeType() {
    if (this.treeType == Tree.deciduousTreeTypeValue())
      return (Tree.deciduousTreeTypeIconFilename());
    else
      return (Tree.evergreenTreeTypeIconFilename());
  }

  iconForLeafPosition() {
    if (this.leafPosition == Tree.oppositeLeafPositionValue())
      return (Tree.oppositeLeafPositionIconFilename());
    else
      return (Tree.alternateLeafPositionIconFilename());
  }

  iconForLeafStructure() {
    if (this.leafStructure == Tree.simpleLeafStructureValue())
      return (Tree.simpleLeafStructureIconFilename());
    else
      return (Tree.compoundLeafStructureIconFilename());
  }

  iconForLeafType() {
    if (this.leafType == Tree.broadLeafTypeValue())
      return (Tree.broadLeafTypeIconFilename());
    else
      return (Tree.needleLeafTypeIconFilename());
  }

}
