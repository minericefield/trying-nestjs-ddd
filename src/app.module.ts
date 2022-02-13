import { Module } from '@nestjs/common';

import { CreateTaskUseCase } from './application/use-case/create-task.usecase';
import { DeleteTaskUseCase } from './application/use-case/delete-task.usecase';
import { GetAllTasksUseCase } from './application/use-case/get-all-tasks.usecase';
import { UpdateTaskUseCase } from './application/use-case/update-task.usecase';
import { DuplicateTaskChecker } from './domain/domain-service/duplicate-task-checker';
import { NewTaskCreator } from './domain/factory/new-task-creator';
import { RepositoryModule } from './infrastructure/repository/repository.module';
import { TaskController } from './presentation/controller/task.controller';

@Module({
  imports: [RepositoryModule.register(process.env.REPOSITORY_TYPE)],
  controllers: [TaskController],
  providers: [
    // Entity factory
    NewTaskCreator,
    // Domain service
    DuplicateTaskChecker,
    // Application service
    CreateTaskUseCase,
    DeleteTaskUseCase,
    GetAllTasksUseCase,
    UpdateTaskUseCase,
  ],
})
export class AppModule {}
