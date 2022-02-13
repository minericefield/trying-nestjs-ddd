import { Injectable } from '@nestjs/common';

import { INewTaskCreator } from '../domain-object/entity/i-new-task-creator';
import { Task } from '../domain-object/entity/task';
import { TaskName } from '../domain-object/value-object/task-name';
import { ITaskRepository } from '../i-repository/i-task.repository';

@Injectable()
export class NewTaskCreator implements INewTaskCreator {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async handle(taskName: TaskName): Promise<Task> {
    const id = await this.taskRepository.getNextId();
    return new Task(id, taskName);
  }
}
