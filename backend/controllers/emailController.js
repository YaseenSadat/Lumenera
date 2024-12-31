import { sendEmail } from '../config/emailService.js';

export const sendPurchaseEmail = async (req, res) => {
  const { email, productName } = req.body;

  if (!email || !productName) {
    return res.status(400).json({ error: 'Email and product name are required.' });
  }

  try {
    await sendEmail(
      email,
      `DELIVERED: Your Lumenera Card Awaits`,
      `<p>Esteemed Seeker,</p>
       <p>We extend our deepest gratitude for venturing into the realm of <strong>Lumenera</strong> and acquiring the <strong>${productName}</strong>.</p>
       <p>Within your possession now lies a fragment of our mystical world—a treasure forged from the tales and legends of the ages. May it inspire you, as it has inspired those who dared to dream of the extraordinary.</p>
       <p>The artifact you have claimed is attached to this email. Guard it well, for such power is not to be taken lightly.</p>
       <p>Should you seek further wonders, know that the gates of Lumenera remain ever open to the brave and curious.</p>
       <p>With the utmost regard,<br>The Lumenera Custodians</p>`
    );


    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email.', details: error.message });
  }
};
