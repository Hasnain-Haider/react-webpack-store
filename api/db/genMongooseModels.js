import mongoose, { Schema } from 'mongoose';
import User from './user';
import fs from 'fs';
import path from 'path';

const ObjectId = Schema.Types.ObjectId;
const schemaDir = './JSONschemas';

const getModelName = name => (name.endsWith('s') ? name : `${name}s`);

const genMongooseSchema = name => {
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

const genMongooseModels = async resources => {
  await resources.forEach(async resource =>
    mongoose.model(getModelName(resource), genMongooseSchema(resource))
  );
};

export default genMongooseModels;
