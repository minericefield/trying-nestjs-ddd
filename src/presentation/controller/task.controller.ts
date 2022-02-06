import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { TaskApplicationService } from '../../application/use-case/task.application-service';

import {
  GetAllTasksResponse,
  CreateTaskRequest,
  CreateTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
  DeleteTaskResponse,
} from './task.controller.dtos';

@Controller('tasks')
export class TaskController {
  constructor(
    private readonly taskApplicationService: TaskApplicationService,
  ) {}

  @Get()
  async getAll(): Promise<GetAllTasksResponse> {
    const tasks = await this.taskApplicationService.getAll();

    return new GetAllTasksResponse(tasks);
  }

  @Post()
  async createOne(
    @Body() createTaskRequest: CreateTaskRequest,
  ): Promise<CreateTaskResponse> {
    await this.taskApplicationService
      .createOne({ name: createTaskRequest.name })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });

    return { statusCode: 200 };
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateTaskRequest: UpdateTaskRequest,
  ): Promise<UpdateTaskResponse> {
    await this.taskApplicationService
      .updateOne({
        id: Number(id),
        name: updateTaskRequest.name,
        done: updateTaskRequest.done,
      })
      .catch((err) => {
        throw new InternalServerErrorException(err.message);
      });

    return { statusCode: 200 };
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string): Promise<DeleteTaskResponse> {
    await this.taskApplicationService.deleteOne({ id: Number(id) });

    return { statusCode: 200 };
  }
}
