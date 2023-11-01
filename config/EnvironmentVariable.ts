import {
  IsEnum,
  IsNumber,
  IsString,
  IsDefined,
  MinLength,
  Matches,
} from 'class-validator';
import { Environment } from './types';
import { USERNAME_PATTERN } from '../constants/regexexpression';

export class EnvironmentVariables {
  @IsDefined({ message: 'Environment where the app will run is not defined.' })
  @IsEnum(Environment, {
    message: 'Failed to verify environment allowed (DEV/PROD).',
  })
  NODE_ENV: Environment;

  @IsDefined({ message: 'App port is not defined.' })
  @IsNumber({}, { message: 'Failed to verify application port.' })
  PORT: number;

  @IsDefined({ message: 'Database port is not defined.' })
  @IsNumber({}, { message: 'Failed to verify the database port.' })
  DATABASE_PORT: number;

  @Matches(USERNAME_PATTERN)
  @IsDefined({ message: 'Database user is NOT defined.' })
  @IsString({ message: 'Failed to verify the database user.' })
  DATABASE_USER: string;

  @MinLength(8)
  @IsDefined({ message: 'Database password is NOT defined.' })
  @IsString({ message: 'Failed to verify the database password.' })
  DATABASE_PASSWORD: string;

  @IsDefined({ message: 'Database host is NOT defined.' })
  @MinLength(4)
  @IsString({ message: 'Failed to verify the database host.' })
  DATABASE_HOST: string;

  @IsDefined({ message: 'Database name is NOT defined.' })
  @MinLength(2)
  @IsString({ message: 'Failed to verify the database name.' })
  DATABASE_NAME: string;

  @IsDefined({ message: 'App name is NOT defined.' })
  @MinLength(2)
  @IsString({ message: 'Failed to verify the app name.' })
  APP_NAME: string;
}
