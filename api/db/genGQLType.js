import graphql, {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLBoolean
} from 'graphql';

import request from 'superagent';
const schemaPath = './schemas';

const genType = name => {
  const schema = require(`${schemaPath}/${name}`);
  var typeObj = {
    name: name,
    fields: {
      _id: {
        type: GraphQLID
       }
    }
  };

  for (let field in schema) {
    let type;
    switch (schema[field].type) {
      case 'Number':
        type = GraphQLFloat;
        break;
      case 'Boolean':
        type = GraphQLBoolean;
        break;
      case '[String]':
        type = GraphQLList(GraphQLString);
      default:
        type = GraphQLString;
        break;
    }
    typeObj.fields[field] = { type };
  }

  return new GraphQLObjectType(typeObj);
}

export default genType;
