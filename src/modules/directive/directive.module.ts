import { Module } from '@nestjs/common';
import { DirectiveResolver } from './directive.resolver';

@Module({
  controllers: [],
  providers: [DirectiveResolver]
})
export class DirectiveModule {}
