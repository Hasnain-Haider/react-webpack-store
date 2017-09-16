import graphql, { GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLSchema } from 'graphql';
import request from 'superagent';
import genType from './genGQLType';

const fetchResourceHTTP = async(args, uri) => {
  const key = args.key || "_id";
  const value = args.value;

  const resourceResponse = await request
  .get(`${url}/${uri}`)
  .withCredentials()
  .catch(e => console.error('error', e));

  const data = resourceResponse.body.data;

  for (let resource of data) {
    if (resource[key] === value) {
      return resource;
    }
  }

  return null;
}

const fetchResourceMongo = async (args, name) => {
  return (await mongoose.models[name].findOne());
}

const genQuery = resources => {
  let queryObj = {
    name: 'Query',
    fields: {  }
  }

  resources.mongo.forEach(resource => {
    queryObj.fields[resource] = {
      type: genType(resource),
      args:{
        value: { type: GraphQLString },
        key: { type: GraphQLString }
      },
      resolve: (obj, args, ctx) => fetchResourceMongo(args, resource)
    }
  });

   return new GraphQLObjectType(queryObj);
}

const genSchema = resources => new GraphQLSchema({ query: genQuery(resources) })

export default genSchema;
