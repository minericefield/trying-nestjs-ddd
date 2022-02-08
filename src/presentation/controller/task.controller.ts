import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';

import { TaskApplicationService } from '../../application/use-case/task.application-service';
import {
  CreateTaskCommand,
  DeleteTaskCommand,
  UpdateTaskCommand,
} from '../../application/use-case/task.application-service.commands';
import {
  DefaultExceptionPresenter,
  UnexpectedExceptionPresenter,
} from '../exception-presenters';

import {
  GetAllTasksResponseDto,
  CreateTaskRequestDto,
  CreateTaskResponseDto,
  UpdateTaskRequestDto,
  UpdateTaskResponseDto,
  DeleteTaskResponseDto,
} from './task.controller.dtos';

@Controller('tasks')
@UseFilters(DefaultExceptionPresenter, UnexpectedExceptionPresenter)
export class TaskController {
  constructor(
    private readonly taskApplicationService: TaskApplicationService,
  ) {}

  @Get()
  async getAll(): Promise<GetAllTasksResponseDto> {
    const tasks = await this.taskApplicationService.getAll();

    return new GetAllTasksResponseDto(tasks);
  }

  @Post()
  async createOne(
    @Body() createTaskRequestDto: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    await this.taskApplicationService.createOne(
      new CreateTaskCommand(createTaskRequestDto.name),
    );

    return { statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateTaskRequestDto: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    await this.taskApplicationService.updateOne(
      new UpdateTaskCommand(
        Number(id),
        updateTaskRequestDto.name,
        updateTaskRequestDto.done,
      ),
    );

    return { statusCode: HttpStatus.OK };
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: string): Promise<DeleteTaskResponseDto> {
    await this.taskApplicationService.deleteOne(
      new DeleteTaskCommand(Number(id)),
    );

    return { statusCode: HttpStatus.OK };
  }
}
