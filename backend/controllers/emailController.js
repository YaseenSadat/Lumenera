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
