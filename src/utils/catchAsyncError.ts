import { InternalServerErrorException } from '@nestjs/common';

export const catchAsyncErr = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (error) {
      throw InternalServerErrorException;
    }
  };
};
