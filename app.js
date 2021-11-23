import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import Handlebars from 'express-handlebars';
const { engine } = Handlebars;
import mongoose from 'mongoose';
import postsRoutes from './routes/posts.js';
import usersRoutes from './routes/users.js';
import methodOverride from 'method-override';
import Post from './models/post.js';
import session from 'express-session';
import helpers from './helpers.js';
import MongoStore from 'connect-mongo';

const app = express();
const port = process.env.PORT || 3000;
const database = process.env.DB_URL;

mongoose.connect(database).catch((e) => {
  console.log(e);
});

app.engine('.hbs', engine({ extname: '.hbs', helpers: helpers }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: database,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
});

store.on('error', function (e) {
  console.log('Session Store Error', e);
});

const sessionConfig = {
  store,
  name: 'id',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(function (req, res, next) {
  res.locals.user = req.session;
  next();
});

app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);

app.get('/', async (req, res) => {
  const posts = await Post.find({ hidden: false }).limit(3).sort({ date: -1 }).lean();
  res.render('home', { layout: 'home-layout', posts: posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('*', (req, res) => {
  res.render('error');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
