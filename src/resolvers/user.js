import mongoose from "mongoose";
import { UserInputError } from 'apollo-server-express';
import { User } from '../models'
import Joi from 'joi';
import { signUp, signIn } from '../schemas';
import * as Auth from '../auth';

export default {

  Query: {
    me:(root, args, {req}, info) => {
      Auth.checkSignIn(req)
      return User.findById(req.session.userId);
    },
    users:(root, args, { req }, info) => {
       // TODO: auth, projection, pagination
      Auth.checkSignIn(req)
      return User.find({});
    },
    user:(root, args, { req }, info) => {
      // TODO: auth, projection, sanitation
      Auth.checkSignIn(req);
      return !mongoose.Types.ObjectId.isValid(args.id) ? new UserInputError(`${id} is not valid user ID.`) : User.findById(id);
    },
  },

  Mutation: {
    signIn: async (root, args, {req}, info) => {
      const { userId } = req.session;

      if (userId) {
        return User.findById(userId);
      }

      await Joi.validate(args, signIn);

      const {email, password} = args;

      const user = await Auth.signInAttempt(email, password);

      req.session.userId = user.id;

      return user
    },

    signUp: async (root, args, { req }, info) => {
      Auth.checkSignOut(req);
      await Joi.validate(args, signUp);
      return User.create(args);
    },

    signOut: async (root, args, { req }, info) => { 
      Auth.checkSignOut(req);
    },
  },
};