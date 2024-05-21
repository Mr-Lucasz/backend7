// server/Route.js
import express from 'express';
import { handleFormSubmission } from './formController.js';

const router = express.Router();

router.post('/', handleFormSubmission);
router.get('/', (req, res) => {
  res.send('Hello World');
});

export default router;