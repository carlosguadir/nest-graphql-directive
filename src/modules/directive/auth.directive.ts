import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export function authDirective(
  schema: GraphQLSchema,
  directiveName: string,
) {
  const directiveHandler = (fieldConfig) => {
    const authDirectiveConfig = getDirective(
      schema,
      fieldConfig,
      directiveName,
    )?.[0];
    if (authDirectiveConfig) {
      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = async (source, args, context, info) => {
        /**
         * authDirectiveConfig: Object
         * Has all arguments allowed to have in directive config
         * It's possible to define any args as is required
         */
        console.info(authDirectiveConfig);
        /**
         * args: Object
         * Here are defined all args for resolver where, data, inputs all of then can be handled
         * to evaluate for example what data/resource is going to be queried.
         */
        console.info(args);
        /**
         * context: Object
         * Context is a very special object, here could be find current authenticated user
         * This object could be use to identify who is making the request. It's possible to load custom data in context
         * to share transversally in graphql requests.
         * https://www.apollographql.com/docs/apollo-server/migration/#context-initialization-function
         */
        console.info(context);
        const result = await resolve(source, args, context, info);
        if (typeof result === 'string') {
          return result.toUpperCase();
        }
        return result;
      };
      return fieldConfig;
    }
  }

  return mapSchema(schema, {
    // This is needed to add for mutations and queries only root ones, could be find more here
    // https://www.apollographql.com/docs/apollo-server/v3/schema/creating-directives/#supported-locations
    [MapperKind.QUERY_ROOT_FIELD]: directiveHandler,
    [MapperKind.MUTATION_ROOT_FIELD]: directiveHandler
  });
}