const requireLogin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/users/login');
  }
  next();
};

export default requireLogin;
