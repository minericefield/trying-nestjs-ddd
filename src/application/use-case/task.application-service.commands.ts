// TODO: Validation e.g class-validator or make yourself...

export interface CreateTaskCommand {
  name: string;
}

export interface UpdateTaskCommand {
  id: number;
  name: string;
  done: boolean;
}

export interface DeleteTaskCommand {
  id: number;
}
