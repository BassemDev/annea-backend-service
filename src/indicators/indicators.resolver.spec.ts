import { Test, TestingModule } from '@nestjs/testing';

import { IndicatorsResolver } from './indicators.resolver';
import { IndicatorsService } from './indicators.service';
import { DataSource } from 'typeorm';

import { IndicatorsRepository } from './indicators.repository';
import { IndicatorMock } from './testUtils/indicatorMocks';
import { Indicator } from './entities/indicator.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateIndicatorInput } from './dto/create-indicator.input';

describe('IndicatorsResolver', () => {
  let resolver: IndicatorsResolver;

  const indicatorServiceMock = {
    retrieveAllIndicator: jest.fn(),
    retrieveIndicatorById: jest.fn(),
    createNewIndicator: jest.fn(),
    modifyIndicator: jest.fn(),
    deleteIndicator: jest.fn(),
    findAllIndicatorByTurbineId: jest.fn(),
  };

  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IndicatorsResolver,
        { provide: IndicatorsService, useValue: indicatorServiceMock },
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

  describe('findAll', () => {
    it('should return all the indicators', async () => {
      // Arrange
      const mockList: Indicator[] = new IndicatorMock().getListOfIndicators();
      indicatorServiceMock.retrieveAllIndicator.mockResolvedValue(mockList);

      // Act
      const indicators = await resolver.findAll();

      // Assert
      expect(indicators).toBe(mockList);
      expect(indicatorServiceMock.retrieveAllIndicator).toHaveBeenCalledTimes(
        1,
      );
    });

    it('should return empty the List', async () => {
      // Arrange
      indicatorServiceMock.retrieveAllIndicator.mockResolvedValue([]);

      // Act
      const indicators = await resolver.findAll();

      // Assert
      expect(indicators.length).toEqual(0);
      expect(indicatorServiceMock.retrieveAllIndicator).toHaveBeenCalledTimes(
        2,
      );
    });

    describe('findIndicatorById', () => {
      it('should return indicator by id', async () => {
        // Arrange
        const id = 2;
        const indicator = 10;
        const mockedIndicator: Indicator =
          new IndicatorMock().generateIndicatorSample(2, indicator);
        indicatorServiceMock.retrieveIndicatorById.mockResolvedValue(
          mockedIndicator,
        );

        // Act
        const result = await resolver.findIndicatorById(id);

        // Assert
        expect(result).toBe(mockedIndicator);
        expect(indicatorServiceMock.retrieveIndicatorById).toHaveBeenCalledWith(
          id,
        );
      });

      it('should throw when id NOT matching any existing item', async () => {
        // Arrange
        const unexistentIndicatorId = 5;
        const mockedIndicator = null;
        indicatorServiceMock.retrieveIndicatorById.mockResolvedValue(
          mockedIndicator,
        );

        // Act
        // Assert
        await expect(
          resolver.findIndicatorById(unexistentIndicatorId),
        ).rejects.toThrow(NotFoundException);
      });
    });

    describe('createIndicator', () => {
      it('should create new indicator', async () => {
        // Arrange
        const newId = 2;
        const indicator = 10;
        const mockedIndicator: Indicator =
          new IndicatorMock().generateIndicatorSample(newId, indicator);
        indicatorServiceMock.createNewIndicator.mockResolvedValue(
          mockedIndicator,
        );
        const newIndicator = new CreateIndicatorInput();
        newIndicator.indicator = 10;
        newIndicator.timestamp = new Date();
        newIndicator.turbineId = 13;
        newIndicator.variable = 1;

        // Act
        const result = await resolver.createIndicator(newIndicator);

        // Assert
        expect(result.id).toBe(newId);
        expect(indicatorServiceMock.createNewIndicator).toHaveBeenCalledWith(
          newIndicator,
        );
      });
    });

    describe('removeIndicator', () => {
      it('should delete indicator by id', async () => {
        // Arrange
        const id = 2;
        indicatorServiceMock.deleteIndicator.mockResolvedValue({ affected: 1 });

        // Act
        const result = await resolver.removeIndicator(id);

        // Assert
        expect(result.affected).toBe(1);
        expect(indicatorServiceMock.deleteIndicator).toHaveBeenCalledWith(2);
      });

      it('should delete indicator by id', async () => {
        // Arrange
        const id = 2;
        indicatorServiceMock.deleteIndicator.mockResolvedValue({ affected: 0 });

        // Act
        // Assert
        await expect(resolver.removeIndicator(id)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
