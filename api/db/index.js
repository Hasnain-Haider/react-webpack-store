import mongoose, { Schema } from 'mongoose';

const ObjectId = Schema.Types.ObjectId;
const schemaDir = './JSONschemas';

const genMongooseSchema = (name) => {
  console.debug(`making schem for ${name}`);
  const schema = require(`${schemaDir}/${name}`);
  const schemaObj = { };
  for (const field in schema) {
    let type;
    const targetField = schema[field];
    const required = targetField.required;
    switch (targetField.type) {
    case 'Number' :
    case 'Integer' :
    case 'Float' :
      type = Number;
      break;
    case 'Boolean' :
      type = Boolean;
      break;
    case '[String]':
      type = [String];
      break;
    case 'ObjectId':
      type = ObjectId;
      break;
    case '[ObjectId]':
      type = [ObjectId];
      break;
    default :
      type = String;
      break;
    }
    schemaObj[field] = {
      type,
      required,
    };
  }
  return new Schema(schemaObj);
};

const genMongooseModels = async (resources) => {
  await resources.forEach(async resource =>
    mongoose.model(resource, genMongooseSchema(resource))
  );
};

export default genMongooseModels;
