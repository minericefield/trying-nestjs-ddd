import { Injectable } from '@nestjs/common';

import { TaskName } from '../../domain/domain-object/value-object/task-name';
import { DuplicateTaskChecker } from '../../domain/domain-service/duplicate-task-checker';
import { NewTaskCreator } from '../../domain/factory/new-task-creator';
import { ITaskRepository } from '../../domain/i-repository/i-task.repository';
import { Exception } from '../../exception';

import { CreateTaskCommand } from './commands/create-task.command';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly duplicateTaskChecker: DuplicateTaskChecker,
    private readonly newTaskCreator: NewTaskCreator,
    private readonly taskRepository: ITaskRepository,
  ) {}

  async handle(createTaskCommand: CreateTaskCommand): Promise<void> {
    const task = await this.newTaskCreator.handle(
      new TaskName(createTaskCommand.name),
    );

    const doesTaskExist = await this.duplicateTaskChecker.handle(task);
    if (doesTaskExist) throw new Exception('Same task already exists.');

    await this.taskRepository.save(task);
  }
}
