export class MapLocation {
  public id: number;
  public xPercentage: number;
  public yPercentage: number;

  constructor(sourceObject?: any) {
    if (sourceObject) {
      this.id = sourceObject.id;
      for (var key in sourceObject.attributes) {
        this[key] = +sourceObject.attributes[key];
      }
    }
  }

  pluralClassName() {
    return ('MapLocations')
  }

}
