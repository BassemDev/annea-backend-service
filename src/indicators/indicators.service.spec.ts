import { Test, TestingModule } from '@nestjs/testing';
import { IndicatorsService } from './indicators.service';
import { DataSource } from 'typeorm';

import { IndicatorsRepository } from './indicators.repository';
import { IndicatorMock } from './testUtils/indicatorMocks';
import { CreateIndicatorInput } from './dto/create-indicator.input';

describe('IndicatorsService', () => {
  let service: IndicatorsService;
  const mock: IndicatorMock = new IndicatorMock();

  const dataSource = {
    createEntityManager: jest.fn(),
  };

  const indicatorsRepositoryMock = {
    createIndicator: jest.fn(),
    getIndicatorById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicatorsService,
        {
          provide: IndicatorsRepository,
          useValue: indicatorsRepositoryMock,
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    service = module.get<IndicatorsService>(IndicatorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewIndicator', () => {
    it('should create new indicator', async () => {
      // Arrange
      const mockedIndicator = mock.generateIndicatorSample(2, 10);
      indicatorsRepositoryMock.createIndicator.mockResolvedValue(
        mockedIndicator,
      );
      const newIndicator = new CreateIndicatorInput();
      newIndicator.indicator = 10;
      newIndicator.timestamp = new Date();
      newIndicator.turbineId = 13;
      newIndicator.variable = 1;

      // Act
      const indicator = await service.createNewIndicator(newIndicator);

      // Assert
      expect(indicator).toEqual(mockedIndicator);
      expect(indicatorsRepositoryMock.createIndicator).toHaveBeenCalledWith(
        newIndicator,
      );
      expect(indicatorsRepositoryMock.createIndicator).toHaveBeenCalledTimes(1);
    });
  });

  describe('retrieveIndicatorById', () => {
    it('should fetch indicator by Id', async () => {
      // Arrange
      const indicatorId = 2;
      const mockedIndicator = mock.generateIndicatorSample(2, 10);
      indicatorsRepositoryMock.getIndicatorById.mockResolvedValue(
        mockedIndicator,
      );

      // Act
      const indicator = await service.retrieveIndicatorById(indicatorId);

      // Assert
      expect(indicator).toEqual(mockedIndicator);
      expect(indicatorsRepositoryMock.getIndicatorById).toHaveBeenCalledWith(
        indicatorId,
      );
      expect(indicatorsRepositoryMock.getIndicatorById).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
