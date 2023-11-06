import { ObjectType, Int, Field } from '@nestjs/graphql';

@ObjectType()
export class DeletedIndicator {
  @Field(() => Int, {
    description: 'Affected id after delete operation',
  })
  readonly affected: number;

  constructor(affected: number) {
    this.affected = affected;
  }
}
