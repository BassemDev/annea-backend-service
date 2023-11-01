import { Test, TestingModule } from '@nestjs/testing';

import { IndicatorsResolver } from './indicators.resolver';
import { IndicatorsService } from './indicators.service';

describe('IndicatorsResolver', () => {
  let resolver: IndicatorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndicatorsResolver, IndicatorsService],
    }).compile();

    resolver = module.get<IndicatorsResolver>(IndicatorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
