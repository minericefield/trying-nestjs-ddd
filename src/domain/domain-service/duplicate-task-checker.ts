import { Injectable } from '@nestjs/common';

import { Task } from '../domain-object/entity/task';
import { ITaskRepository } from '../i-repository/i-task.repository';

@Injectable()
export class DuplicateTaskChecker {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async handle(task: Task): Promise<boolean> {
    const foundedTask = await this.taskRepository.findOneByName(task.name);
    return !!foundedTask;
  }
}
