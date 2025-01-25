import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal Server Error';

    if (exception instanceof HttpException) {
      // Handle HttpException (including validation errors)
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        // Extract validation error messages
        message = exceptionResponse['message'];
      } else {
        message = exception.message;
      }
    } else if (exception instanceof InternalServerErrorException) {
      // Handle generic errors
      message = exception.message;
    }

    // Log the error (in both development and production)
    // this.logError(exception, request)

    // Send environment-specific error response
    if (process.env.NODE_ENV === 'development') {
      this.sendDevelopmentError(response, statusCode, message, exception, request);
    } else {
      this.sendProductionError(exception, response, statusCode, message);
    }
  }

  // private logError(exception: unknown, request: Request): void {
  //   console.error(`[${new Date().toISOString()}] Error occurred:`)
  //   console.error(`Path: ${request.url}`)
  //   console.error(`Error: ${exception}`)
  //   if (exception instanceof Error && exception.stack) {
  //     console.error(`Stack: ${exception.stack}`)
  //   }
  // }

  private sendDevelopmentError(
    response: Response,
    statusCode: number,
    message: string,
    exception: unknown,
    request: Request,
  ): void {
    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
      stack: exception instanceof Error ? exception.stack : null,
    });
  }

  private sendProductionError(
    exception: any,
    response: Response,
    statusCode: number,
    message: string,
  ): void {
    console.log(exception);
    response.status(statusCode).json({
      success: false,
      message: message || 'An error occurred',
    });
  }
}
