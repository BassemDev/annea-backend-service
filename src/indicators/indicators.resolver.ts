import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Logger, NotFoundException, UsePipes } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { IndicatorsService } from './indicators.service';
import { CreateIndicatorInput } from './dto/create-indicator.input';
import { UpdateIndicatorInput } from './dto/update-indicator.input';
import { Indicator } from './responses/indicator.response';
import { ArgsValidationPipe } from '../pipes/argsValidationPipe';
import { idSchema, turbineIdSchema } from '../pipes/schemavalidation';
import { DeletedIndicator } from './responses/deleteIndicator.response';

@Resolver(() => Indicator)
export class IndicatorsResolver {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(IndicatorsResolver.name);

  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Mutation(() => Indicator)
  async createIndicator(
    @Args('createIndicatorInput') createIndicatorInput: CreateIndicatorInput,
  ) {
    this.logger.log(`Query - create indicator called.`);
    return await this.indicatorsService.createNewIndicator(
      createIndicatorInput,
    );
  }

  @Query(() => [Indicator], { name: 'indicators' })
  async findAll() {
    this.logger.log(`Query - fetch all indicator called.`);
    return await this.indicatorsService.retrieveAllIndicator();
  }

  @Query(() => [Indicator], { name: 'indicatorsByTurbineId' })
  @UsePipes(new ArgsValidationPipe(turbineIdSchema))
  async findAllindicatorByTurbineId(
    @Args('turbineId', { type: () => Int })
    turbineId: number,
  ) {
    this.logger.log(`Query - find all indicator by id called.`);
    return await this.indicatorsService.retrieveIndicatorById(turbineId);
  }

  @Query(() => Indicator, { name: 'indicator' })
  @UsePipes(new ArgsValidationPipe(idSchema))
  async findIndicatorById(@Args('id', { type: () => Int }) id: number) {
    this.logger.log(`Query - find indicator with id: ${id} called.`);
    const result = await this.indicatorsService.retrieveIndicatorById(id);

    if (result === null) {
      this.logger.log(`There was no indicator with id: ${id} found.`);
      throw new NotFoundException(`Indicator with id ${id} not found`);
    }

    return result;
  }

  @Mutation(() => Indicator)
  async updateIndicator(
    @Args('updateIndicatorInput') updateIndicatorInput: UpdateIndicatorInput,
  ) {
    this.logger.log(
      `Mutation - update indicator with id: ${updateIndicatorInput.id} called.`,
    );
    return await this.indicatorsService.modifyIndicator(updateIndicatorInput);
  }

  @Mutation(() => DeletedIndicator)
  async removeIndicator(@Args('id', { type: () => Int }) id: number) {
    this.logger.log(`Mutation - delete indicator with id: ${id} called.`);
    const response = await this.indicatorsService.deleteIndicator(id);
    if (!response.affected) {
      throw new NotFoundException(
        `Indicator to delete with id ${id} Not found`,
      );
    }
    return new DeletedIndicator(response.affected);
  }
}
