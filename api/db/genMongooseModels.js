import mongoose, { Schema } from 'mongoose';
import User from './user';
import fs from 'fs';
import path from 'path';
const ObjectId = Schema.Types.ObjectId;
const schemaDir = './schemas';

const getModelName = name => name.endsWith('s') ? name : `${name}s`;

const genMongooseSchema = name => {
  const schema = require(`${schemaDir}/${name}`);
  var schemaObj = { /* _id: Schema.Types.ObjectId */ };
  for (let field in schema) {
    let type;
    let targetField = schema[field];
    let required = targetField.required;
    switch (targetField.type) {
      case 'Number'  :
      case 'Integer' :
      case 'Float'   :
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
      default        :
        type = String;
        break;
    }
    schemaObj[field] = {
      type,
      required
    }
  }
  return new Schema(schemaObj);
}

const genMongooseModels = async resources => {
  await resources.forEach(async resource =>
    mongoose.model(getModelName(resource), genMongooseSchema(resource))
  );
}

export default genMongooseModels;
