import express from 'express';
import { submitForm } from './formController.js';

const router = express.Router();

router.post('/', submitForm);

export default router;