import { GraphQLScalarType, Kind } from "graphql";

// via: https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value: Date) {
    return value.toString();
  },
  parseValue(value: Date) {
    return new Date(value);
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }

    return null;
  },
});
