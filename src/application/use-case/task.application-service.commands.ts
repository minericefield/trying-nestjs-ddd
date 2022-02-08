export class CreateTaskCommand {
  constructor(public name: string) {}
}

export class UpdateTaskCommand {
  constructor(public id: number, public name: string, public done: boolean) {}
}

export class DeleteTaskCommand {
  constructor(public id: number) {}
}
