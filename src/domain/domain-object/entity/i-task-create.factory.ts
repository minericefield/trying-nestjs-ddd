// To make aware of the factory, place the factory interface on the same directory layer of the entity.

import { TaskName } from '../value-object/task-name';

import { Task } from './task';

export interface ITaskCreateFactory {
  handle(taskName: TaskName): Promise<Task>;
}
