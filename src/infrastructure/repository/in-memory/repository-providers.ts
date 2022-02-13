import { ITaskRepository } from '../../../domain/i-repository/i-task.repository';

import { TaskInMemoryRepository } from './repositories/task.repository';

export default [
  // Repository
  {
    provide: ITaskRepository,
    useClass: TaskInMemoryRepository,
  },
];
