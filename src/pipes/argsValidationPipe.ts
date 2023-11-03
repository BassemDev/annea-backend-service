import { PipeTransform, BadRequestException, Logger } from '@nestjs/common';
import { Schema } from 'yup';

export class ArgsValidationPipe implements PipeTransform {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(ArgsValidationPipe.name);
  constructor(private readonly schema: Schema) {}

  async transform(value: unknown) {
    try {
      await this.schema.validate(value);
      return value;
    } catch (error) {
      this.logger.error(
        `Bad request - the following value ${value} is not respecting argument schema`,
      );
      throw new BadRequestException('Bad request - Validation failed');
    }
  }
}
