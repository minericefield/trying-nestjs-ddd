export class UpdateTaskCommand {
  constructor(public id: number, public name: string, public done: boolean) {}
}
