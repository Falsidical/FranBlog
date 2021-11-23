import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username cannot be empty'],
    unique: [true, 'Username is not unique'],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.statics.findByUsernameAndValidate = async function (username, password) {
  const user = await this.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : false;
};

const User = mongoose.model('User', userSchema);
export default User;
