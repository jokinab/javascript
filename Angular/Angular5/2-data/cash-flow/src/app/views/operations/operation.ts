export class Operation {

  public _id: String;
  public amount: Number;
  public description: String;
  public kind: String;

  constructor() {
    this._id = new Date().getTime().toString();
  }
}
