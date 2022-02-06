import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entity/task.entity';
import ormconfig from './ormconfig';
import repositoryProviders from './repository-providers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  providers: [...repositoryProviders],
  exports: [TypeOrmModule, ...repositoryProviders],
})
export class MysqlTypeormModule {}
