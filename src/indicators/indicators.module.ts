import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IndicatorsService } from './indicators.service';
import { IndicatorsResolver } from './indicators.resolver';
import { Indicator } from './entities/indicator.entity';
import { IndicatorRepository } from './indicator.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Indicator])],
  providers: [IndicatorsResolver, IndicatorsService, IndicatorRepository],
})
export class IndicatorsModule {}
