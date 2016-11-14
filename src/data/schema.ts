/**
 * GraphQL schema
 */

import * as GraphQL from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';

const {
  GraphQLSchema,
  GraphQLObjectType,
} = GraphQL;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      me,
      content,
      news,
    },
  }),
});

export default schema;
