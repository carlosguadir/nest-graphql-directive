import { Field, Int, ObjectType, ScalarsTypeMap } from '@nestjs/graphql';

@ObjectType()
export class SweetObject {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}