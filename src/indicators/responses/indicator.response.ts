import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class Indicator {
  @Field(() => Float, { description: 'Indicator associated to the turbine' })
  readonly indicator: number;

  @Field(() => Int, {
    description: 'Variable associated to the entry of every indicator',
  })
  readonly variable: number;

  @Field(() => Int, { description: 'Turbine id associated to the indicator' })
  readonly turbineId: number;

  @Field()
  readonly timestamp: Date;
}
