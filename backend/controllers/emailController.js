import { sendEmail } from '../config/emailService.js';
import crypto from 'crypto';
import User from '../models/userModel.js';

export const sendPurchaseEmail = async (req, res) => {
    const { email, productNames, productImages } = req.body;

    if (!email || !productNames || !productImages) {
        return res.status(400).json({ error: 'Email, product names, and images are required.' });
    }

    try {
        await sendEmail(
            email,
            `DELIVERED: Your Lumenera Cards`,
            `<p>Esteemed Seeker,</p>
             <p>We extend our deepest gratitude for venturing into the realm of <strong>Lumenera</strong> and acquiring the following treasures:</p>
             <p>${productNames}</p>
             <p>Here are the artifacts you have claimed:</p>
             <div>${productImages}</div>
             <p>May these treasures inspire you, as they have inspired those who dared to dream of the extraordinary.</p>
             <p>Guard them well, for such power is not to be taken lightly.</p>
             <p>Should you seek further wonders, know that the gates of Lumenera remain ever open to the brave and curious.</p>
             <p>With the utmost regard,<br>The Lumenera Custodians</p>`
        );

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email.', details: error.message });
    }
};

export const sendSubscriptionEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        await sendEmail(
            email,
            'Welcome to the World of Lumenera!',
            `<p>Esteemed Adventurer,</p>
             <p>You have taken your first step into the magical realm of <strong>Lumenera</strong>. We are honored to have you join our ever-growing fellowship of seekers, strategists, and collectors.</p>
             <p>By subscribing, you gain exclusive access to:</p>
             <ul>
                 <li>Announcements about new, legendary card collections</li>
                 <li>Special offers tailored for our most dedicated adventurers</li>
                 <li>Early access to events, tips, and strategic insights</li>
             </ul>
             <p>The journey ahead promises excitement, challenges, and untold treasures. May your path be paved with victories and your collection ever growing.</p>
             <p>Prepare yourself, for the gates of Lumenera are now open to you. Seek us often for updates and uncover the wonders we have in store.</p>
             <p>With honor and gratitude,<br>The Lumenera Custodians</p>`
        );
        

        res.status(200).json({ success: true, message: 'Subscription email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send subscription email.', details: error.message });
    }
};

export const sendForgotPasswordEmail = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Generate a secure random token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
  
      // Save token and expiry in the user document
      user.resetToken = resetToken;
      user.resetTokenExpiry = resetTokenExpiry;
      await user.save();
  
      // Generate reset link
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
      // Email content
      const subject = 'Password Reset Request';
      const text = `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 1 hour.`;
  
      // Send email
      await sendEmail(email, subject, text);
  
      return res.status(200).json({ success: true, message: 'Password reset email sent.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'An error occurred while sending the email.' });
    }
  };