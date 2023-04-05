import { Resolver, Query, Directive, Args, Mutation } from '@nestjs/graphql';
import { SweetArgs } from './objects/user.args';
import { SweetObject } from './objects/user.object';

@Resolver( () => SweetObject)
export class DirectiveResolver {
    @Directive('@auth( type: "sweetData" action: READ )')
    @Query(() => SweetObject)
    private sweetData(
        @Args() args: SweetArgs
    ): SweetObject {
        return {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName'
        }
    }

    @Directive('@auth( type: "createSweetData" action: CREATE )')
    @Mutation(() => SweetObject)
    private createSweetData(
        // TODO Add args here to data
    ): SweetObject {
        return {
            id: 1,
            firstName: 'firstName',
            lastName: 'lastName'
        }
    }
}
