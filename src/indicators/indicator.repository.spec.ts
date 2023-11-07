import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { IndicatorsRepository } from './indicators.repository';
import { IndicatorMock } from './testUtils/indicatorMocks';
import { CreateIndicatorInput } from './dto/create-indicator.input';

describe('IndicatorRepository', () => {
  let repository: IndicatorsRepository;
  let mock: IndicatorMock;

  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicatorsRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    repository = module.get<IndicatorsRepository>(IndicatorsRepository);
    mock = new IndicatorMock();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getAllIndicator', () => {
    it('should return all the indicators', async () => {
      // Arrange
      const mockedList = mock.getListOfIndicators();
      const getAllIndicatorSpy = jest
        .spyOn(repository, 'getAllIndicator')
        .mockResolvedValue(mockedList);

      // Act
      const allIndicators = await repository.getAllIndicator();

      // Assert
      expect(allIndicators).toEqual(mockedList);
      expect(getAllIndicatorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('createIndicator', () => {
    it('should create new indicator', async () => {
      // Arrange
      const mockedIndicator = mock.generateIndicatorSample(2, 10);
      const getAllIndicatorSpy = jest
        .spyOn(repository, 'createIndicator')
        .mockResolvedValue(mockedIndicator);
      const newIndicator = new CreateIndicatorInput();
      newIndicator.indicator = 10;
      newIndicator.timestamp = new Date();
      newIndicator.turbineId = 13;
      newIndicator.variable = 1;

      // Act
      const indicator = await repository.createIndicator(newIndicator);

      // Assert
      expect(indicator).toEqual(mockedIndicator);
      expect(getAllIndicatorSpy).toHaveBeenCalledWith(newIndicator);
      expect(getAllIndicatorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getIndicatorById', () => {
    it('should return an indicator by id', async () => {
      // Arrange
      const searchedIndicatorId = 2;
      const mockedIndicator = mock.generateIndicatorSample(2, 10);
      const getAllIndicatorSpy = jest
        .spyOn(repository, 'getIndicatorById')
        .mockResolvedValue(mockedIndicator);

      // Act
      const indicator = await repository.getIndicatorById(2);

      // Assert
      expect(indicator).toEqual(mockedIndicator);
      expect(getAllIndicatorSpy).toHaveBeenCalledWith(searchedIndicatorId);
    });
  });
});
