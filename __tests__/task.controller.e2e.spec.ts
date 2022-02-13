import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect({
        statusCode: 200,
        tasks: [
          {
            id: 1,
            name: 'Install mysql.',
            done: true,
          },
          {
            id: 2,
            name: 'Create database.',
            done: false,
          },
        ],
      });
  });

  it('/tasks (POST) duplicate error', () => {
    return request(app.getHttpServer())
      .post('/tasks')
      .send({ name: 'Install mysql.' })
      .expect({
        statusCode: 500,
        message: 'Same task already exists.',
      });
  });
});
