import graphql, {
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

const schemaPath = './JSONschemas';

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
    let schemaField = schema[field];
    switch (schemaField.type) {
      case 'Number':
      case 'Float':
        type = GraphQLFloat;
        break;
      case 'Integer':
        type = GraphQLInt;
        break;
      case 'Boolean':
        type = GraphQLBoolean;
        break;
      case '[String]':
        type = new GraphQLList(GraphQLString);
        break;
      case 'ObjectId':
        type = GraphQLID;
        break;
      case '[ObjectId]':
        type = new GraphQLList(GraphQLID);
        break;
      default:
        type = GraphQLString;
        break;
    }
    type = schemaField.required ? new GraphQLNonNull(type) : type;
    typeObj.fields[field] = { type };
  }

  return new GraphQLObjectType(typeObj);
}

export default genType;
