import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { Indicator } from './entities/indicator.entity';
import { CreateIndicatorInput } from './dto/create-indicator.input';
import { UpdateIndicatorInput } from './dto/update-indicator.input';

@Injectable()
export class IndicatorsRepository extends Repository<Indicator> {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(IndicatorsRepository.name);

  constructor(private dataSource: DataSource) {
    super(Indicator, dataSource.createEntityManager());
  }

  async createIndicator(
    createIndicatorInput: CreateIndicatorInput,
  ): Promise<Indicator> {
    this.logger.log(`Start creating a new indicator.`);
    return await this.save(createIndicatorInput);
  }

  async getAllIndicator(): Promise<Indicator[]> {
    this.logger.log(`Start fetching all indactors.`);
    return this.find();
  }

  async getIndicatorById(id: number): Promise<Indicator | null> {
    this.logger.log(`Start fetching the indicator with id: ${id}.`);
    return this.findOneBy({ id });
  }

  async updateIndicator(
    updateIndicatorInput: UpdateIndicatorInput,
  ): Promise<Indicator> {
    this.logger.log(
      `Start updating the indicator with id: ${updateIndicatorInput.id}.`,
    );
    return this.save({ ...updateIndicatorInput });
  }

  async deleteIndicator(id: number): Promise<DeleteResult> {
    this.logger.log(`Start deleting the indicator with id: ${id}.`);
    return this.delete({ id });
  }

  async getIndicatorsByTurbineId(turbineId: number): Promise<Indicator[]> {
    this.logger.log(`Start fetching indicators with trubine id: ${turbineId}.`);
    return this.findBy({ turbineId });
  }
}
