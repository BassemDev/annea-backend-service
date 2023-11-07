import { InputType, Int, Field, Float } from '@nestjs/graphql';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsPositive
} from 'class-validator';

@InputType()
export class CreateIndicatorInput {
  @IsDefined({
    message: 'The indicator MUST be defined when creating new indicator.',
  })
  @Field(() => Float, { description: 'Indicator associated to the turbine.' })
  indicator: number;

  @IsDefined({
    message: 'The variable MUST be defined when creating new indicator.',
  })
  @IsNumber({ allowInfinity: false })
  @Field(() => Int, {
    description: 'Variable associated to the entry of every indicator.',
  })
  variable: number;

  @IsPositive({ message: 'The given turbine id MUST be positive.' })
  @IsDefined({
    message: 'The trubine id MUST be defined when creating new indicator.',
  })
  @Field(() => Int, { description: 'Turbine id associated to the indicator.' })
  turbineId: number;

  @IsDate({ message: 'The value provided is not of type Date.' })
  @IsDefined({
    message: 'The timestamp MUST be defined when creating new indicator.',
  })
  @Field(() => Date)
  timestamp: Date;
}
