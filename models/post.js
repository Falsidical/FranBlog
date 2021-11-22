import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: true },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
