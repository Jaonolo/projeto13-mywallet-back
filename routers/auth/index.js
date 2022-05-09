import express from 'express';
import login from './login.js'
import register from './register.js'

const router = express.Router();
router.post('/login', login);
router.post('/register', register);

export default router; 