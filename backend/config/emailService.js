/**
 * emailService.js
 * 
 * This module handles sending emails using Nodemailer. 
 * It creates a reusable transporter for Gmail and provides a utility 
 * function `sendEmail` for sending emails with specified recipients, subjects, 
 * and HTML content.
 */

import nodemailer from 'nodemailer'; // Importing Nodemailer for email handling

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Email service provider
  auth: {
    user: process.env.EMAIL_USER, // Sender's email address (from environment variables)
    pass: process.env.EMAIL_PASS, // Sender's email password (from environment variables)
  },
});

/**
 * Sends an email to a specified recipient.
 * 
 * @param {string} to - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email body.
 * 
 * @throws {Error} Throws an error if the email fails to send.
 */
export const sendEmail = async (to, subject, htmlContent) => {
  try {
    console.log(`Sending email to: ${to}`);

    // Send the email
    await transporter.sendMail({
      from: `"Lumenera" <${process.env.EMAIL_USER}>`, // Sender's name and email
      to, // Recipient's email
      subject, // Email subject
      html: htmlContent, // HTML content for the email body
    });

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
