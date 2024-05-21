// server/Route.js
import express from 'express';
import { handleFormRequest, handleFormSubmission } from './formController.js';


const router = express.Router();

router.post('/', handleFormSubmission);
router.get('/', handleFormRequest);

export default router;