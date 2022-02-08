import { HttpStatus } from '@nestjs/common';

export class Exception {
  constructor(
    public message: string,
    public statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    public payload?: any,
  ) {}
}
