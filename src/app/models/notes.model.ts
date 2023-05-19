import { v4 as createUuid } from "uuid";

export class Notes {
  private _id: string;
  private _filed: boolean;

  constructor(private _description: string, private _detailing: string) {
    this._id = createUuid();
    this._filed = false;
  }
  // getter
  public get id() {
    return this._id;
  }

  public get description() {
    return this._description;
  }

  public get detailing() {
    return this._detailing;
  }

  public get filed() {
    return this._filed;
  }

  //setter

  public set description(description: string) {
    this._description = description;
  }

  public set detailing(detailing: string) {
    this._detailing = detailing;
  }

  public set filed(filed: boolean) {
    this._filed = filed;
  }

  public static create(id: string, description: string, detailing: string, filed: boolean): Notes {
    const notes = new Notes(description, detailing);
    notes._id = id;
    // notes._description = description;
    // notes._detailing = detailing;
    // notes._filed = filed;
    return notes;
  }

  // public static create(id: string, descr: string, password: string, notes?: Notes[]) {
  //   const user = new Username(username, password);
  //   user._idUser = id;
  //   user._notes = notes ?? [];
  //   return user;
  // }
}
