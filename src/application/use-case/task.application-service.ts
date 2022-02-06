import { Injectable } from '@nestjs/common';

import { Task } from '../../domain/domain-object/entity/task';
import { TaskName } from '../../domain/domain-object/value-object/task-name';
import { TaskCheckDuplicateDomainService } from '../../domain/domain-service/task-check-duplicate.domain-service';
import { TaskCreateFactory } from '../../domain/factory/task-create.factory';
import { ITaskRepository } from '../../domain/i-repository/i-task.repository';

import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from './task.application-service.commands';

@Injectable()
export class TaskApplicationService {
  constructor(
    private readonly taskCheckDuplicateDomainService: TaskCheckDuplicateDomainService,
    private readonly taskCreateFactory: TaskCreateFactory,
    private readonly taskRepository: ITaskRepository,
  ) {}

  async getAll(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  async createOne(createTaskCommand: CreateTaskCommand): Promise<void> {
    const task = await this.taskCreateFactory.handle(
      new TaskName(createTaskCommand.name),
    );

    const doesTaskExist = await this.taskCheckDuplicateDomainService.handle(
      task.name,
    );
    if (doesTaskExist) throw new Error('Same task already exists.');

    await this.taskRepository.save(task);
  }

  async updateOne(updateTaskCommand: UpdateTaskCommand): Promise<void> {
    // TODO: Command validation.
    const task = new Task(
      updateTaskCommand.id,
      new TaskName(updateTaskCommand.name),
      updateTaskCommand.done,
    );

    const doesTaskExist = await this.taskCheckDuplicateDomainService.handle(
      task.name,
    );
    if (doesTaskExist) throw new Error('Same task already exists.');

    await this.taskRepository.updateOne(task);
  }

  async deleteOne(deleteTaskCommand: DeleteTaskCommand): Promise<void> {
    await this.taskRepository.deleteOne(deleteTaskCommand.id);
  }
}
