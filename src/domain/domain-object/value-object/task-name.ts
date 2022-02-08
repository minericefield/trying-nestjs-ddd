import { Exception } from '../../../exception';

export class TaskName {
  private _value: string;

  get value(): string {
    return this._value;
  }

  constructor(value: string) {
    if (value.length === 0)
      throw new Exception('Task name should not be empty.');

    if (value.length > 20)
      throw new Exception('Task name should not be longer than 20 characters.');

    this._value = value;
  }
}
