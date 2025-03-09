// lib/email.ts
// Example using SendGrid
import sgMail from '@sendgrid/mail';

// Set your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function sendEmail({ to, subject, text, html }: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM || 'your-email@example.com',
    subject,
    text,
    html: html || text,
  };
  
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error };
  }
}