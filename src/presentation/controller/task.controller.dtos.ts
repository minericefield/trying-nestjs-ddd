import { Task } from '../../domain/domain-object/entity/task';

export class GetAllTasksResponse {
  // The property name 'statusCode' is derived from nestjs exception.
  public statusCode = 200;
  public tasks: { id: number; name: string; done: boolean }[];

  constructor(_tasks: Task[]) {
    this.tasks = _tasks.map((task) => {
      return { id: task.id, name: task.name.value, done: task.done };
    });
  }
}

export interface CreateTaskRequest {
  name: string;
}

export interface CreateTaskResponse {
  statusCode: number;
}

export interface UpdateTaskRequest {
  name: string;
  done: boolean;
}

export interface UpdateTaskResponse {
  statusCode: number;
}

export interface DeleteTaskResponse {
  statusCode: number;
}
