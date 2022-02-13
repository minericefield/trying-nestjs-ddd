// To make aware of the factory's existence to developers, place the factory interface in the same layer to the entity.

import { TaskName } from '../value-object/task-name';

import { Task } from './task';

export interface INewTaskCreator {
  handle(taskName: TaskName): Promise<Task>;
}
