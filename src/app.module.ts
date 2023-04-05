import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DirectiveModule } from './modules/directive/directive.module';
import { authDirective } from './modules/directive/auth.directive';
import { DirectiveLocation, GraphQLDirective, GraphQLEnumType, GraphQLScalarType, GraphQLString } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: 'api',
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'auth',
            args: {
              type: {
                description: 'Type of resources to authorize',
                type: GraphQLString
              },
              action: {
                description: 'Action in object',
                type: new GraphQLEnumType({ 
                  name: 'ActioType',
                  values: {
                    READ: { value: 'READ' },
                    UPDATE: { value: 'UPDATE' },
                    CREATE: { value: 'CREATE' },
                  },
                }),
              }
            },
            locations: [DirectiveLocation.QUERY],
          }),
        ],
      },
      transformSchema: (schema) => authDirective(schema, 'auth'),
    }),
    DirectiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
