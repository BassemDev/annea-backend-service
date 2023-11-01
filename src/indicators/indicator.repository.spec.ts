import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { IndicatorRepository } from './indicator.repository';
import { IndicatorMock } from './testUtils/indicatorMocks';

describe('IndicatorRepository', () => {
  let repository: IndicatorRepository;
  let mock: IndicatorMock;

  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicatorRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    repository = module.get<IndicatorRepository>(IndicatorRepository);
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
});
