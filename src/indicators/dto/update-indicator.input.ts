import { CreateIndicatorInput } from './create-indicator.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsDefined } from 'class-validator';

@InputType()
export class UpdateIndicatorInput extends PartialType(CreateIndicatorInput) {
  @Field(() => Int)
  @IsNumber({ allowInfinity: false })
  @IsDefined({
    message: 'The id MUST be defined when updating an existing indicator.',
  })
  id: number;
}
