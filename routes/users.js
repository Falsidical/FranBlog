import express from 'express';
import usersControllers from '../controllers/users.js';

const router = express.Router();

router.get('/login', usersControllers.renderLoginPage);

router.get('/register', usersControllers.renderRegisterPage);

router.post('/logout', usersControllers.destroySession);

router.post('/', usersControllers.createUser);

router.post('/login', usersControllers.authenticateUser);

export default router;
