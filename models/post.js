import mongoose from 'mongoose';
const { Schema } = mongoose;

const toKebabCase = (string) =>
  string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const postSchema = new Schema({
  title: {
    type: String,
    unique: [true, 'Post title must be unique'],
    required: [true, 'Posts must have a title'],
  },
  author: String,
  body: String,
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: true },
  linkTitle: {
    type: String,
    unique: [true, 'linkTitle must be unique'],
  },
});

postSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();
  this.linkTitle = toKebabCase(this.title);
  next();
});

const Post = mongoose.model('Post', postSchema);
export default Post;
