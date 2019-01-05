import mongoose from "mongoose";
import { UserInputError } from 'apollo-server-express';
import { User } from '../models'

export default {
  Query: {
    users:(root, args, ctx, info) => {
      return User.find({});
    },
    user:(root, args, ctx, info) => {
      !mongoose.Types.ObjectId.isValid(id) ? new UserInputError(`${id} is not valid user ID.`) : User.findById(id);
    },
  },
  Mutation: {
    signUp:(root, args, ctx, info) => {
      return User.create(args)
    },
  },
};