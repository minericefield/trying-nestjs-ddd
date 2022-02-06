import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { TaskApplicationService } from '../src/application/use-case/task.application-service';
import { Task } from '../src/domain/domain-object/entity/task';
import { TaskName } from '../src/domain/domain-object/value-object/task-name';
import { ITaskRepository } from '../src/domain/i-repository/i-task.repository';

describe('TaskApplicationService (unit)', () => {
  let app: INestApplication;
  let applicationService: TaskApplicationService;
  let taskRepository: ITaskRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    applicationService = moduleFixture.get<TaskApplicationService>(
      TaskApplicationService,
    );
    taskRepository = moduleFixture.get<ITaskRepository>(ITaskRepository);
  });

  it('should be defined', () => {
    expect(applicationService).toBeDefined();
  });

  it('getAll', () => {
    expect(applicationService.getAll()).resolves.toEqual([
      new Task(1, new TaskName('Install mysql.'), true),
      new Task(2, new TaskName('Create database.'), false),
    ]);
  });

  it('createOne', async () => {
    await applicationService.createOne({
      name: 'New Task.',
    });
    expect(taskRepository.getAll()).resolves.toEqual([
      new Task(1, new TaskName('Install mysql.'), true),
      new Task(2, new TaskName('Create database.'), false),
      new Task(3, new TaskName('New Task.'), false),
    ]);
  });
});
