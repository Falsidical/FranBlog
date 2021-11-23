import User from '../models/user.js';

const renderLoginPage = (req, res) => {
  res.render('users/login');
};

const renderRegisterPage = (req, res) => {
  res.render('users/register');
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.redirect('/users/login');
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsernameAndValidate(username, password);

  if (user) {
    req.session.user_id = user._id;
    req.session.username = user.username;
    return res.redirect('/posts/admin');
  } else {
    res.redirect('users/login');
  }
};

const destroySession = (req, res) => {
  //req.session.user_id = null;
  req.session.destroy();
  res.redirect('/');
};

export default {
  renderLoginPage,
  renderRegisterPage,
  createUser,
  authenticateUser,
  destroySession,
};
