import { Test, TestingModule } from '@nestjs/testing';

import { IndicatorsResolver } from './indicators.resolver';
import { IndicatorsService } from './indicators.service';
import { DataSource } from 'typeorm';
import { IndicatorsRepository } from './indicators.repository';

describe('IndicatorsResolver', () => {
  let resolver: IndicatorsResolver;

  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicatorsResolver,
        IndicatorsService,
        IndicatorsRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    resolver = module.get<IndicatorsResolver>(IndicatorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
