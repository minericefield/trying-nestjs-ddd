import { Task } from '../domain-object/entity/task';
import { TaskName } from '../domain-object/value-object/task-name';

export abstract class ITaskRepository {
  abstract getAll(): Promise<Task[]>;
  abstract save(task: Task): Promise<void>;
  abstract updateOne(task: Task): Promise<void>;
  abstract deleteOne(id: number): Promise<void>;
  abstract findOneById(id: number): Promise<Task | null>;
  abstract findOneByName(taskName: TaskName): Promise<Task | null>;
  abstract getNextId(): Promise<number>; // TODO: Possibly not suitable for a repository's responsibility.
}
