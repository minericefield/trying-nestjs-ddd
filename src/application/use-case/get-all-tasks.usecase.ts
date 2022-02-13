import { Injectable } from '@nestjs/common';

import { Task } from '../../domain/domain-object/entity/task';
import { ITaskRepository } from '../../domain/i-repository/i-task.repository';

@Injectable()
export class GetAllTasksUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}

  async handle(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }
}
