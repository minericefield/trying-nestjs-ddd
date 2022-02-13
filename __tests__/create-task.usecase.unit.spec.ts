import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { CreateTaskUseCase } from '../src/application/use-case/create-task.usecase';
import { Task } from '../src/domain/domain-object/entity/task';
import { TaskName } from '../src/domain/domain-object/value-object/task-name';
import { ITaskRepository } from '../src/domain/i-repository/i-task.repository';
import { Exception } from '../src/exception';

describe('CreateTaskUseCase (unit)', () => {
  let app: INestApplication;
  let createTaskUseCase: CreateTaskUseCase;
  let taskRepository: ITaskRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    createTaskUseCase = moduleFixture.get<CreateTaskUseCase>(CreateTaskUseCase);
    taskRepository = moduleFixture.get<ITaskRepository>(ITaskRepository);
  });

  it('should be defined', () => {
    expect(createTaskUseCase).toBeDefined();
  });

  it('handle', async () => {
    await createTaskUseCase.handle({
      name: 'New Task.',
    });
    expect(taskRepository.getAll()).resolves.toEqual([
      new Task(1, new TaskName('Install mysql.'), true),
      new Task(2, new TaskName('Create database.'), false),
      new Task(3, new TaskName('New Task.'), false),
    ]);
  });

  it('handle duplicated', () => {
    createTaskUseCase
      .handle({
        name: 'Install mysql.',
      })
      .catch((error) => {
        expect(error).toEqual(new Exception('Same task already exists.'));
      });
  });
});
