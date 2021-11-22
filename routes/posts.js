import express from 'express';
import postsController from '../controllers/posts.js';

const router = express.Router();

router.get('/', postsController.showPosts);

router.post('/', postsController.createPost);

router.get('/new', postsController.renderNewPostForm);

router.get('/admin', postsController.renderAdminPage);

router.get('/edit/:id', postsController.renderEditForm);

router.get('/:id', postsController.renderPost);

router.delete('/:id', postsController.deletePost);

router.put('/:id', postsController.editPost);

export default router;
