import { Injectable } from '@nestjs/common';

import { TaskName } from '../domain-object/value-object/task-name';
import { ITaskRepository } from '../i-repository/i-task.repository';

@Injectable()
export class TaskCheckDuplicateDomainService {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async handle(taskName: TaskName): Promise<boolean> {
    const foundedTask = await this.taskRepository.findOneByName(taskName);
    return !!foundedTask;
  }
}
