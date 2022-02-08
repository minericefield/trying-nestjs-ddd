import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Exception } from '../exception';

@Catch(Exception)
export class DefaultExceptionPresenter implements ExceptionFilter {
  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.statusCode).json({ ...exception });
  }
}

@Catch()
export class UnexpectedExceptionPresenter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    response
      .status(statusCode)
      .json({ statusCode, message: 'Unexpected error ocurred.', ...exception });
  }
}
