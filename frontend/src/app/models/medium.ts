export class Medium {
  public id: number;
  public fileName: string;
  public title: string;
  public caption: string;
  public credits: string;
  public tagName: string;

  constructor(sourceObject?: any) {
    if (sourceObject) {
      this.id = sourceObject.id;
      for (var key in sourceObject.attributes) {
          this[key] = sourceObject.attributes[key];
      }
    }
  }

  pluralClassName() {
    return ('Media')
  }

}
