import { Injectable } from '@nestjs/common';

import { Task } from '../../domain/domain-object/entity/task';
import { TaskName } from '../../domain/domain-object/value-object/task-name';
import { DuplicateTaskChecker } from '../../domain/domain-service/duplicate-task-checker';
import { ITaskRepository } from '../../domain/i-repository/i-task.repository';
import { Exception } from '../../exception';

import { UpdateTaskCommand } from './commands/update-task.command';

@Injectable()
export class UpdateTaskUseCase {
  constructor(
    private readonly duplicateTaskChecker: DuplicateTaskChecker,
    private readonly taskRepository: ITaskRepository,
  ) {}

  async handle(updateTaskCommand: UpdateTaskCommand): Promise<void> {
    const task = await this.taskRepository.findOneById(updateTaskCommand.id);
    if (!task)
      throw new Exception(`Cannot find task (id: ${updateTaskCommand.id}).`);

    task.updateName(new TaskName(updateTaskCommand.name));
    task.updateDone(updateTaskCommand.done);

    // TODO: Fix bug. Since in this way, updating only status is not available.
    const doesTaskExist = await this.duplicateTaskChecker.handle(task);
    if (doesTaskExist) throw new Exception('Same task already exists.');

    await this.taskRepository.updateOne(task);
  }
}
