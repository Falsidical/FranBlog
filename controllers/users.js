import User from '../models/user.js';
import bcrypt from 'bcrypt';

const renderLoginPage = (req, res) => {
  res.render('users/login');
};

const renderRegisterPage = (req, res) => {
  res.render('users/register');
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  res.redirect('/');
};

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const validation = await bcrypt.compare(password, user.password);
    if (validation) {
      req.session.user_id = user._id;
      return res.redirect('/posts/admin');
    } else {
      res.redirect('users/login');
    }
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
