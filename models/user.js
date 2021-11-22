import mongoose from 'mongoose';
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

const User = mongoose.model('User', userSchema);
export default User;
