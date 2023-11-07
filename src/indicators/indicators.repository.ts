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

  /**
   * this is function is used to create a new indicator in indicator's table.
   * @param createIndicatorInput this will type of CreateIndicatorInput in which
   * @returns promise of indicator
   */
  async createIndicator(
    createIndicatorInput: CreateIndicatorInput,
  ): Promise<Indicator> {
    this.logger.log(`Start creating a new indicator.`);
    return await this.save(createIndicatorInput);
  }

  /**
   * this function used to get data of an all indicators which exist in DB
   * @returns promise of table indicator or empty table in case of empty table
   */
  async getAllIndicator(): Promise<Indicator[]> {
    this.logger.log(`Start fetching all indactors.`);
    return this.find();
  }

  /**
   * this function used to get data of an indicator whom id is passed as parameter
   * @param id is of type of number, which represent the id of the indicator.
   * @returns promise of indicator or null in case of NOT found
   */
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

    const indicator = await this.getIndicatorById(updateIndicatorInput.id);
    const entityToSave = { ...indicator, ...updateIndicatorInput };

    return this.save(entityToSave);
  }

  /**
   * this function is used to remove or delete indicator from database.
   * @param id is the type of number, which represent id of an indicator
   * @returns delete result which contain for exp. the affected rows
   */
  async deleteIndicator(id: number): Promise<DeleteResult> {
    this.logger.log(`Start deleting the indicator with id: ${id}.`);
    return this.delete({ id });
  }

  async getIndicatorsByTurbineId(turbineId: number): Promise<Indicator[]> {
    this.logger.log(`Start fetching indicators with trubine id: ${turbineId}.`);
    return this.findBy({ turbineId });
  }
}
