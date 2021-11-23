import express from 'express';
import postsController from '../controllers/posts.js';
import requireLogin from '../middleware/requireLogin.js';

const router = express.Router();

router.get('/', postsController.showPosts);

router.post('/', requireLogin, postsController.createPost);

router.get('/new', requireLogin, postsController.renderNewPostForm);

router.get('/admin', requireLogin, postsController.renderAdminPage);

router.get('/edit/:id', requireLogin, postsController.renderEditForm);

router.get('/:id', postsController.renderPost);

router.delete('/:id', requireLogin, postsController.deletePost);

router.put('/:id', requireLogin, postsController.editPost);

export default router;
