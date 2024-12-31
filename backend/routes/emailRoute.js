import express from 'express';
import { sendPurchaseEmail, sendSubscriptionEmail } from '../controllers/emailController.js';

const emailRouter = express.Router();

emailRouter.post('/send-email', sendPurchaseEmail);
emailRouter.post('/subscribe', sendSubscriptionEmail);


export default emailRouter;
