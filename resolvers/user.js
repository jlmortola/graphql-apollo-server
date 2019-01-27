import mongoose from "mongoose";
import { UserInputError } from 'apollo-server-express';
import { User } from '../models'
import Joi from 'joi';
import { signUp } from '../schemas';

export default {
  Query: {
    users:(root, args, ctx, info) => {
       // TODO: auth, projection, pagination
      return User.find({});
    },
    user:(root, args, ctx, info) => {
      // TODO: auth, projection, sanitation
      return !mongoose.Types.ObjectId.isValid(args.id) ? new UserInputError(`${id} is not valid user ID.`) : User.findById(id);
    },
  },
  Mutation: {

    signUp: async (root, args, ctx, info) => {
       // TODO: auth, validation
      
      await Joi.validate(args, signUp);

      return User.create(args)
    },
  },
};