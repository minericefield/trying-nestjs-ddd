import { Injectable } from '@nestjs/common';

import { ITaskRepository } from '../../domain/i-repository/i-task.repository';

import { DeleteTaskCommand } from './commands/delete-task.command';

@Injectable()
export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async handle(deleteTaskCommand: DeleteTaskCommand): Promise<void> {
    await this.taskRepository.deleteOne(deleteTaskCommand.id);
  }
}
