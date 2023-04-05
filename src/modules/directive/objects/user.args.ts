import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class SweetInput {
  @Field(type => String)
  uuid: string;
}

@ArgsType()
export class SweetArgs {
  @Field(()=> SweetInput)
  where: SweetInput
}