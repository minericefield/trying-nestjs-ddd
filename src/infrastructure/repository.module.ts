import process from 'process';

import { DynamicModule, Module } from '@nestjs/common';

import { InMemoryRepositoryModule } from './in-memory/module';
import { MysqlTypeormModule } from './mysql/typeorm/module';

type RepositoryType = typeof process.env.REPOSITORY_TYPE;

@Module({})
export class RepositoryModule {
  static register(repositoryType: RepositoryType): DynamicModule {
    let repositoryModule;

    switch (repositoryType) {
      case 'in-memory':
        repositoryModule = InMemoryRepositoryModule;
        break;
      case 'mysql-typeorm':
        repositoryModule = MysqlTypeormModule;
        break;
      default:
        throw 'Please provide a proper "REPOSITORY_TYPE"';
    }

    return {
      module: repositoryModule,
    };
  }
}
