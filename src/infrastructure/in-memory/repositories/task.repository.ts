import { Injectable } from '@nestjs/common';

import { Task } from '../../../domain/domain-object/entity/task';
import { TaskName } from '../../../domain/domain-object/value-object/task-name';
import { ITaskRepository } from '../../../domain/i-repository/i-task.repository';

@Injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  // Mock.
  private _tasks = [
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

  public async getAll(): Promise<Task[]> {
    return this._tasks.map(
      (taskData) =>
        new Task(taskData.id, new TaskName(taskData.name), taskData.done),
    );
  }

  public async save(task: Task): Promise<void> {
    this._tasks.push({
      id: task.id,
      name: task.name.value,
      done: task.done,
    });
  }

  public async updateOne(task: Task): Promise<void> {
    this._tasks = this._tasks.map((_task) => {
      if (_task.id === task.id) {
        return { id: task.id, name: task.name.value, done: task.done };
      }

      return _task;
    });
  }

  public async deleteOne(id: number): Promise<void> {
    this._tasks = this._tasks
      .map((_task) => {
        if (_task.id !== id) {
          return _task;
        }
      })
      .filter(Boolean);
  }

  public async findOneByName(taskName: TaskName): Promise<Task | null> {
    const taskData = this._tasks.find((_task) => {
      return _task.name === taskName.value;
    });

    if (taskData) {
      return new Task(taskData.id, new TaskName(taskData.name), taskData.done);
    } else {
      return null;
    }
  }

  public async getNextId(): Promise<number> {
    return this._tasks.length + 1;
  }
}
