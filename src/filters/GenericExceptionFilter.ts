import {
  Catch,
  HttpException,
  ArgumentsHost,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';

@Catch()
export class GenericExceptionFilter implements GqlExceptionFilter {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(GenericExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      // tslint:disable-next-line: no-console
      this.logger.error(exception);
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(),
      error:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal server error'
          : exception.message,
    };

    // This is for GRAPHQL petitions
    const error = {
      ...errorResponse,
      type: info.parentType,
      field: info.fieldName,
    };

    Logger.error(
      `${info.parentType} ${info.fieldName}`,
      JSON.stringify(error),
      'ExceptionFilter',
    );

    return exception;
  }
}
