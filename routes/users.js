import express from 'express';
import usersControllers from '../controllers/users.js';
import requireLogin from '../middleware/requireLogin.js';

const router = express.Router();

router.get('/login', usersControllers.renderLoginPage);

router.get('/register', requireLogin, usersControllers.renderRegisterPage);

router.post('/logout', usersControllers.destroySession);

router.post('/', requireLogin, usersControllers.createUser);

router.post('/login', usersControllers.authenticateUser);

export default router;
