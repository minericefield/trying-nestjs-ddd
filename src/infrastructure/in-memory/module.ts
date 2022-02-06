import { Module } from '@nestjs/common';

import repositoryProviders from './repository-providers';

@Module({
  providers: [...repositoryProviders],
  exports: [...repositoryProviders],
})
export class InMemoryRepositoryModule {}
