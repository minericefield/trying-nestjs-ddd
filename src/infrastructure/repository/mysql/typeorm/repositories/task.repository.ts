import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from '../../../../../domain/domain-object/entity/task';
import { TaskName } from '../../../../../domain/domain-object/value-object/task-name';
import { ITaskRepository } from '../../../../../domain/i-repository/i-task.repository';
import { Task as TaskTypeormEntity } from '../../../mysql/typeorm/entity/task.entity';

@Injectable()
// The name 'TaskRepository' not available.
export class TaskTypeormRepository implements ITaskRepository {
  constructor(
    @InjectRepository(TaskTypeormEntity)
    private readonly taskTypeormEntityRepository: Repository<TaskTypeormEntity>,
  ) {}

  async getAll(): Promise<Task[]> {
    const taskDatas = await this.taskTypeormEntityRepository.find({});

    return taskDatas.map(
      (taskData) =>
        new Task(taskData.id, new TaskName(taskData.name), taskData.done),
    );
  }

  async save(task: Task): Promise<void> {
    await this.taskTypeormEntityRepository.save({
      id: task.id,
      name: task.name.value,
      done: task.done,
    });
  }

  async updateOne(task: Task): Promise<void> {
    const taskData = await this.taskTypeormEntityRepository.findOne(task.id);
    taskData.name = task.name.value;
    taskData.done = task.done;
    await this.taskTypeormEntityRepository.save(taskData);
  }

  async deleteOne(id: number): Promise<void> {
    await this.taskTypeormEntityRepository.delete(id);
  }

  async findOneById(id: number): Promise<Task | null> {
    const taskData = await this.taskTypeormEntityRepository.findOne(id);

    if (taskData) {
      return new Task(taskData.id, new TaskName(taskData.name), taskData.done);
    } else {
      return null;
    }
  }

  async findOneByName(taskName: TaskName): Promise<Task | null> {
    const taskData = await this.taskTypeormEntityRepository.findOne({
      name: taskName.value,
    });

    if (taskData) {
      return new Task(taskData.id, new TaskName(taskData.name), taskData.done);
    } else {
      return null;
    }
  }

  async getNextId(): Promise<number> {
    // TODO: Find a better way.
    const { maximumId } = (await this.taskTypeormEntityRepository
      .createQueryBuilder()
      .select('MAX(task.id)', 'maximumId')
      .getRawOne()) as { maximumId: number };

    return maximumId + 1;
  }
}
