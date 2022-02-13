import { Injectable } from '@nestjs/common';

import { Task } from '../../../../domain/domain-object/entity/task';
import { TaskName } from '../../../../domain/domain-object/value-object/task-name';
import { ITaskRepository } from '../../../../domain/i-repository/i-task.repository';

@Injectable()
export class TaskInMemoryRepository implements ITaskRepository {
  // Mock.
  private tasks = [
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

  async getAll(): Promise<Task[]> {
    return this.tasks.map(
      (taskData) =>
        new Task(taskData.id, new TaskName(taskData.name), taskData.done),
    );
  }

  async save(task: Task): Promise<void> {
    this.tasks.push({
      id: task.id,
      name: task.name.value,
      done: task.done,
    });
  }

  async updateOne(task: Task): Promise<void> {
    this.tasks = this.tasks.map((_task) => {
      if (_task.id === task.id) {
        return { id: task.id, name: task.name.value, done: task.done };
      }

      return _task;
    });
  }

  async deleteOne(id: number): Promise<void> {
    this.tasks = this.tasks
      .map((_task) => {
        if (_task.id !== id) {
          return _task;
        }
      })
      .filter(Boolean);
  }

  async findOneById(id: number): Promise<Task | null> {
    const taskData = this.tasks.find((_task) => {
      return _task.id === id;
    });

    if (taskData) {
      return new Task(taskData.id, new TaskName(taskData.name), taskData.done);
    } else {
      return null;
    }
  }

  async findOneByName(taskName: TaskName): Promise<Task | null> {
    const taskData = this.tasks.find((_task) => {
      return _task.name === taskName.value;
    });

    if (taskData) {
      return new Task(taskData.id, new TaskName(taskData.name), taskData.done);
    } else {
      return null;
    }
  }

  async getNextId(): Promise<number> {
    return this.tasks.length + 1;
  }
}
