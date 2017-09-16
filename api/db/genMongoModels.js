import mongoose, { Schema } from 'mongoose';
import User from './user';
import fs from 'fs';
import path from 'path';
var schemaDir = './schemas';


const genMongooseSchema = name => {
  const schema = require(`${schemaDir}/${name}`);
  var schemaObj = { /* _id: Schema.Types.ObjectId */ };
  for (let field in schema) {
    let type;
    let targetField = schema[field];
    let required = targetField.required ? true : false;
    switch (targetField.type) {
      case 'Number'  : type = Number;
                       break;
      case 'Boolean' : type = Boolean;
                        break;
      case '[String]': type = [String];
                        break;
      case 'ObjectId': type = Schema.Types.ObjectId;
                        break;
      default        : type = String;
                        break;
    }
    schemaObj[field] = {
      type,
      required
    }
  }

  return new Schema(schemaObj);
}

const genModels = async resources => {
  await resources.mongo.forEach(async resource => {
    mongoose.model(resource, genMongooseSchema(resource));
  });
}

export default genModels;
