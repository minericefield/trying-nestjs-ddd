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

import { CreateTaskCommand } from '../../application/use-case/commands/create-task.command';
import { DeleteTaskCommand } from '../../application/use-case/commands/delete-task.command';
import { UpdateTaskCommand } from '../../application/use-case/commands/update-task.command';
import { CreateTaskUseCase } from '../../application/use-case/create-task.usecase';
import { DeleteTaskUseCase } from '../../application/use-case/delete-task.usecase';
import { GetAllTasksUseCase } from '../../application/use-case/get-all-tasks.usecase';
import { UpdateTaskUseCase } from '../../application/use-case/update-task.usecase';
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
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly getAllTasksUseCase: GetAllTasksUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  @Get()
  async getAll(): Promise<GetAllTasksResponseDto> {
    const tasks = await this.getAllTasksUseCase.handle();

    return new GetAllTasksResponseDto(tasks);
  }

  @Post()
  async createOne(
    @Body() createTaskRequestDto: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    await this.createTaskUseCase.handle(
      new CreateTaskCommand(createTaskRequestDto.name),
    );

    return { statusCode: HttpStatus.OK };
  }

  @Put('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateTaskRequestDto: UpdateTaskRequestDto,
  ): Promise<UpdateTaskResponseDto> {
    await this.updateTaskUseCase.handle(
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
    await this.deleteTaskUseCase.handle(new DeleteTaskCommand(Number(id)));

    return { statusCode: HttpStatus.OK };
  }
}
