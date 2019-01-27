import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: email => User.checkRepeated({ email }),
      message: ({ value }) => `The email ${value} is already registered`
    },
  },
  username: {
    type: String,
    validate: {
      validator: username => User.checkRepeated({ username }),
      message: ({ value }) => `The username ${value} is already registered`
    },
  },
  name: String,
  password: String,
}, {
  timestamps: true //this will add created at and updated
})

// pre functions happen before sending the data to the db
userSchema.pre('save', async function() {
   if (this.isModified('password')) {
       this.password = await hash(this.password, 12);
     }
});

userSchema.statics.checkRepeated = async option => await User.where(option).countDocuments() === 0; // we add method to check if item is repeated

const User = mongoose.model('User', userSchema);

export default User;