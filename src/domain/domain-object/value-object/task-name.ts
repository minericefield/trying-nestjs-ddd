export class TaskName {
  private _value: string;

  get value(): string {
    return this._value;
  }

  constructor(value: string) {
    if (value.length === 0) {
      throw new Error('Task name must not be empty.');
    }

    if (value.length > 20) {
      throw new Error('Task name must not be longer than 20 characters.');
    }

    this._value = value;
  }
}
