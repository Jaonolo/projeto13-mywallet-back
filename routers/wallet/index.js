import express from 'express';
import add from './add.js';
import list from './list.js';

const router = express.Router();
router.get('/wallet/:id', list);
router.post('/wallet/:id', add);

export default router; 