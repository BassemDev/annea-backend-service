import { ArgsValidationPipe } from './argsValidationPipe';
import { idSchema } from './schemavalidation';

describe('ArgsValidationPipe', () => {
  it('should be defined', () => {
    expect(new ArgsValidationPipe(idSchema)).toBeDefined();
  });
});
