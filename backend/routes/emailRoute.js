import express from 'express';
import { sendPurchaseEmail, sendSubscriptionEmail, sendForgotPasswordEmail } from '../controllers/emailController.js';
import { resetPassword } from '../controllers/userController.js';
const emailRouter = express.Router();

emailRouter.post('/send-email', sendPurchaseEmail);
emailRouter.post('/subscribe', sendSubscriptionEmail);
emailRouter.post('/forgot-password', sendForgotPasswordEmail);
emailRouter.post('/reset-password', resetPassword);




export default emailRouter;
