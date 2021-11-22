import Post from '../models/post.js';

const showPosts = async (req, res) => {
  const posts = await Post.find().lean();
  res.render('posts', { posts: posts });
};

const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = 'Fran';
    const showPost = req.body.showPost;
    showPost && (post.hidden = false);
    await post.save();
    res.redirect('/posts');
  } catch (err) {
    console.log(err);
  }
};

const renderNewPostForm = (req, res) => {
  res.render('posts/new', { layout: 'main' });
};

const renderAdminPage = async (req, res) => {
  const posts = await Post.find().lean();
  res.render('admin', { posts: posts });
};

const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).lean();
  res.render('edit', { layout: 'main', post: post });
};

const renderPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).lean();
  res.render('post', { post: post });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect('/posts');
};

const editPost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const hidden = req.body.hidden;
  console.log(hidden);
  hidden ? (post.hidden = true) : (post.hidden = false);
  await Post.findByIdAndUpdate(id, { ...post });
  res.redirect(`/posts/${id}`);
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
