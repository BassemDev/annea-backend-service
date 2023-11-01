import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

import { IndicatorsService } from './indicators.service';
import { CreateIndicatorInput } from './dto/create-indicator.input';
import { UpdateIndicatorInput } from './dto/update-indicator.input';
import { Indicator } from './responses/indicator.response';

@Resolver(() => Indicator)
export class IndicatorsResolver {
  // Logger used for debug and error reporting
  private readonly logger = new Logger(IndicatorsResolver.name);

  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Mutation(() => Indicator)
  createIndicator(
    @Args('createIndicatorInput') createIndicatorInput: CreateIndicatorInput,
  ) {
    this.logger.log(`Query - create indicator called.`);
    return this.indicatorsService.createNewIndicator(createIndicatorInput);
  }

  @Query(() => [Indicator], { name: 'indicators' })
  findAll() {
    this.logger.log(`Query - fetch all indicator called.`);
    return this.indicatorsService.retrieveAllIndicator();
  }

  @Query(() => [Indicator], { name: 'indicatorsByTurbineId' })
  findAllindicatorByTurbineId(
    @Args('turbineId', { type: () => Int }) turbineId: number,
  ) {
    this.logger.log(`Query - find all indicator by id called.`);
    return this.indicatorsService.retrieveIndicatorById(turbineId);
  }

  @Query(() => Indicator, { name: 'indicator' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    this.logger.log(`Query - find indicator with id: ${id} called.`);
    return this.indicatorsService.retrieveIndicatorById(id);
  }

  @Mutation(() => Indicator)
  updateIndicator(
    @Args('updateIndicatorInput') updateIndicatorInput: UpdateIndicatorInput,
  ) {
    this.logger.log(`Mutation - update indicator with id: ${updateIndicatorInput.id} called.`);
    return this.indicatorsService.modifyIndicator(updateIndicatorInput);
  }

  @Mutation(() => Indicator)
  removeIndicator(@Args('id', { type: () => Int }) id: number) {
    this.logger.log(`Mutation - delete indicator with id: ${id} called.`);
    return this.indicatorsService.deleteIndicator(id);
  }

  @Query(() => [Indicator], { name: 'indicator' })
  getIndicatorsByTurbineId(
    @Args('turbineId', { type: () => Int }) turbineId: number,
  ) {
    this.logger.log(`Query - fetch all indicator by turbine id: ${turbineId} called.`);
    return this.indicatorsService.findAllIndicatorByTurbineId(turbineId);
  }
}
