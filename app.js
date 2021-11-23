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

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/franblog').catch((e) => {
  console.log(e);
});

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'pizza',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);

app.get('/', async (req, res) => {
  const posts = await Post.find({ hidden: false }).limit(3).sort({ date: -1 }).lean();
  res.render('home', { layout: 'home-layout', posts: posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(port);
