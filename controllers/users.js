import User from '../models/user.js';

const renderLoginPage = (req, res) => {
  res.render('login');
};

const renderRegisterPage = (req, res) => {
  res.render('register');
};

const createUser = (req, res) => {
  const user = req.body;
  res.send(user);
};

export default {
  renderLoginPage,
  renderRegisterPage,
  createUser,
};
