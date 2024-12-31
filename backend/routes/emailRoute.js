import express from 'express';
import { sendPurchaseEmail } from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/send-email', sendPurchaseEmail);

export default emailRouter;
