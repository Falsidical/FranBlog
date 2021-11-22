import express from 'express';
import usersControllers from '../controllers/users.js';

const router = express.Router();

router.get('/login', usersControllers.renderLoginPage);

router.get('/register', usersControllers.renderRegisterPage);

router.post('/', usersControllers.createUser);

export default router;
