import { sendEmail } from '../config/emailService.js';


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

