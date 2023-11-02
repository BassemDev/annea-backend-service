import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IndicatorsService } from './indicators.service';
import { IndicatorsResolver } from './indicators.resolver';
import { Indicator } from './entities/indicator.entity';
import { IndicatorsRepository } from './indicators.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Indicator])],
  providers: [IndicatorsResolver, IndicatorsService, IndicatorsRepository],
})
export class IndicatorsModule {}
