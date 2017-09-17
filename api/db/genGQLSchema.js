import graphql, {
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql';
import request from 'superagent';
import mongoose from 'mongoose';
import genGQLType from './genGQLType';

const fetchResourceMongo = async (args, name) => {
  let result;
  var mongooseQuery = {};
  var { key, value } = args;
  name = name.endsWith('s') ? name : `${name}s`;
  if (!key || key === '_id') {
    key = '_id';
    value = mongoose.Types.ObjectId(value)
  }
  mongooseQuery[key] = value;
  result = await mongoose.models[name].findOne(mongooseQuery);
  return result;
}

const genQuery = resources => {
  let queryObj = {
    name: 'Query',
    fields: {  }
  }

  resources.mongo.forEach(resource => {
    queryObj.fields[resource] = {
      type: genGQLType(resource),
      args:{
        value: {
          type: GraphQLString
        },
        key: {
          type: GraphQLString
        }
      },
      resolve: (obj, args, ctx) => fetchResourceMongo(args, resource)
    }
  });
   return new GraphQLObjectType(queryObj);
}

const genSchema = resources => new GraphQLSchema({ query: genQuery(resources) })

export default genSchema;
