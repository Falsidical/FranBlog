import Post from '../models/post.js';
import MarkdownIt from 'markdown-it';

const md = MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

const showPosts = async (req, res) => {
  const posts = await Post.find({ hidden: false }).sort({ date: -1 }).lean();
  res.render('posts/posts', { posts: posts });
};

const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = req.session.username;
    const showPost = req.body.showPost;
    showPost && (post.hidden = false);
    await post.save();
    res.redirect('/posts/admin');
  } catch (err) {
    console.log(err);
  }
};

const renderNewPostForm = (req, res) => {
  res.render('posts/new', { layout: 'main' });
};

const renderAdminPage = async (req, res) => {
  const posts = await Post.find().lean();
  res.render('posts/admin', {
    posts: posts,
  });
};

const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ linkTitle: id }).lean();
  res.render('posts/edit', { layout: 'main', post: post });
};

const renderPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ linkTitle: id }).lean();
  post.body = md.render(post.body);
  res.render('posts/post', { post: post });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findOneAndDelete({ linkTitle: id });
  res.redirect('/posts');
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const hidden = req.body.hidden;
  hidden ? (post.hidden = true) : (post.hidden = false);
  //await Post.findByIdAndUpdate(id, { ...post });
  await Post.findOneAndUpdate({ linkTitle: id }, { ...post });
  res.redirect(`/posts/admin`);
};

export default {
  showPosts,
  createPost,
  renderNewPostForm,
  renderAdminPage,
  renderEditForm,
  renderPost,
  deletePost,
  editPost,
};
