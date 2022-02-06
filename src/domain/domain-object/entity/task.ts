import { TaskName } from '../value-object/task-name';

export class Task {
  private _id: number;
  private _name: TaskName;
  private _done: boolean;

  public get id(): number {
    return this._id;
  }

  public get name(): TaskName {
    return this._name;
  }

  public get done(): boolean {
    return this._done;
  }

  constructor(id: number, name: TaskName, done = false) {
    this._id = id;
    this._name = name;
    this._done = done;
  }

  public updateName(name: TaskName): void {
    this._name = name;
  }

  public updateDone(done: boolean): void {
    this._done = done;
  }
}
