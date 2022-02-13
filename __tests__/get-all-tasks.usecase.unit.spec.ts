import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { GetAllTasksUseCase } from '../src/application/use-case/get-all-tasks.usecase';
import { Task } from '../src/domain/domain-object/entity/task';
import { TaskName } from '../src/domain/domain-object/value-object/task-name';

describe('GetAllTasksUseCase (unit)', () => {
  let app: INestApplication;
  let getAllTasksUseCase: GetAllTasksUseCase;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    getAllTasksUseCase =
      moduleFixture.get<GetAllTasksUseCase>(GetAllTasksUseCase);
  });

  it('should be defined', () => {
    expect(getAllTasksUseCase).toBeDefined();
  });

  it('handle', () => {
    expect(getAllTasksUseCase.handle()).resolves.toEqual([
      new Task(1, new TaskName('Install mysql.'), true),
      new Task(2, new TaskName('Create database.'), false),
    ]);
  });
});
