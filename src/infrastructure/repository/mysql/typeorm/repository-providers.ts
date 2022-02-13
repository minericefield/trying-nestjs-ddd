import { ITaskRepository } from '../../../../domain/i-repository/i-task.repository';

import { TaskTypeormRepository } from './repositories/task.repository';

export default [
  // Repository
  {
    provide: ITaskRepository,
    useClass: TaskTypeormRepository,
  },
  // You can add or switch to 'in-memory repository' if needed for a certain data store.
];
