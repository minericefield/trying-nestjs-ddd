import { Module } from '@nestjs/common';

import { TaskApplicationService } from './application/use-case/task.application-service';
import { TaskCheckDuplicateDomainService } from './domain/domain-service/task-check-duplicate.domain-service';
import { TaskCreateFactory } from './domain/factory/task-create.factory';
import RepositoryModuleProvider from './infrastructure/repository-module-provider';
import { TaskController } from './presentation/controller/task.controller';

@Module({
  imports: [RepositoryModuleProvider],
  controllers: [TaskController],
  providers: [
    // Entity factory
    TaskCreateFactory,
    // Domain service
    TaskCheckDuplicateDomainService,
    // Application service
    TaskApplicationService,
  ],
})
export class AppModule {}
