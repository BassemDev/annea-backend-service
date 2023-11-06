import { Injectable, Logger } from '@nestjs/common';

import { CreateIndicatorInput } from './dto/create-indicator.input';
import { UpdateIndicatorInput } from './dto/update-indicator.input';
import { Indicator } from './entities/indicator.entity';
import { IndicatorsRepository } from './indicators.repository';

@Injectable()
export class IndicatorsService {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(IndicatorsService.name);

  constructor(private readonly indicatorRepository: IndicatorsRepository) {}

  async createNewIndicator(
    createIndicatorInput: CreateIndicatorInput,
  ): Promise<Indicator> {
    try {
      return this.indicatorRepository.createIndicator(createIndicatorInput);
    } catch (error) {
      this.logger.error(
        `An error happened when creating a new indicator. Related error is: ${error}.`,
      );
      throw error;
    }
  }

  async retrieveAllIndicator(): Promise<Indicator[]> {
    try {
      return this.indicatorRepository.getAllIndicator();
    } catch (error) {
      this.logger.error(
        `An error happened when retrieving all indicators. Related error is: ${error}.`,
      );
      throw error;
    }
  }

  async retrieveIndicatorById(id: number): Promise<Indicator | null> {
    try {
      return this.indicatorRepository.getIndicatorById(id);
    } catch (error) {
      this.logger.error(
        `An error happened when retrieving a specific indicator with id: ${id}. Related error is: ${error}.`,
      );
      throw error;
    }
  }

  async modifyIndicator(
    updateIndicatorInput: UpdateIndicatorInput,
  ): Promise<Indicator> {
    try {
      return this.indicatorRepository.updateIndicator(updateIndicatorInput);
    } catch (error) {
      this.logger.error(
        `An error happened when updating a specific indicator with id: ${updateIndicatorInput.id}. Related error is: ${error}`,
      );
      throw new Error(`Modyfing indicator failed with error: ${error}.`);
    }
  }

  async deleteIndicator(id: number): Promise<number | null | undefined> {
    try {
      const deleteResult = await this.indicatorRepository.deleteIndicator(id);
      return deleteResult.affected;
    } catch (error) {
      this.logger.error(
        `An error happened when deleting a specific indicator with id: ${id}. Related error is: ${error}`,
      );
      throw new Error(
        `Deleting indicator with id: ${id} failed with error: ${error}`,
      );
    }
  }

  async findAllIndicatorByTurbineId(id: number): Promise<Indicator[]> {
    try {
      return this.indicatorRepository.getIndicatorsByTurbineId(id);
    } catch (error) {
      this.logger.error(
        `An error happened when finding all indicator by turbine id with id: ${id}. Related error is: ${error}`,
      );
      throw error;
    }
  }
}
