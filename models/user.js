import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email:  String,
  username: String,
  name: String,
  password: String,
}, {
  timestamps: true //this will add created at and updated
})

export default mongoose.model('User', userSchema);