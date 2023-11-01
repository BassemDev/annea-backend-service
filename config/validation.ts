// NPM dependencies imports
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// Interal imports
import { EnvironmentVariables } from './EnvironmentVariable';

export function validateConfig(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
