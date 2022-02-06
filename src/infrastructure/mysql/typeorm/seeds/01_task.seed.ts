import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Task } from '../entity/task.entity';

const tasks: Task[] = [
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
];

export default class TaskSeed implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<void> {
    if (
      (await connection.getRepository(Task).createQueryBuilder().getCount()) ===
      0
    ) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Task)
        .values(tasks)
        .execute();
    }
  }
}
