import nodemailer from 'nodemailer';
import { LeadData } from '../types/chat';

export async function sendLeadNotification(lead: LeadData): Promise<void> {
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const companyName = process.env.COMPANY_NAME || 'Our Construction Company';

  if (!emailFrom || !emailTo || !emailPassword) {
    console.warn('Email notification credentials not fully configured. Skipping email send.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: emailFrom,
      pass: emailPassword,
    },
  });

  const subject = `🏗️ New Lead: ${lead.name || 'Anonymous'} — ${lead.projectType || 'General Inquiry'} — ${companyName}`;

  const htmlBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
  <div style="background: #1a1a2e; color: white; padding: 24px; border-radius: 8px 8px 0 0;">
    <h2 style="margin: 0;">🏗️ New Website Lead</h2>
    <p style="margin: 4px 0 0; opacity: 0.7;">${companyName} — Website Chatbot</p>
  </div>
  <div style="background: #f8f9fa; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr style="background: #eef2f7;">
        <td style="padding: 12px 10px; border: 1px solid #e0e0e0; font-weight: bold; width: 35%;">Name</td>
        <td style="padding: 12px 10px; border: 1px solid #e0e0e0; font-weight: bold;">${lead.name || 'Not provided'}</td>
      </tr>
      <tr style="background: #eef2f7;">
        <td style="padding: 12px 10px; border: 1px solid #e0e0e0; font-weight: bold;">Phone</td>
        <td style="padding: 12px 10px; border: 1px solid #e0e0e0; font-weight: bold;">
          ${lead.phone ? `<a href="tel:${lead.phone}">${lead.phone}</a>` : 'Not provided'}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Email</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">
          ${lead.email ? `<a href="mailto:${lead.email}">${lead.email}</a>` : 'Not provided'}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Project Type</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${lead.projectType || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Project Description</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${lead.projectDescription || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Budget Range</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${lead.budgetRange || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Timeline</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${lead.timeline || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Location</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${lead.location || 'Not provided'}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border: 1px solid #e0e0e0; font-weight: bold;">Best Time to Call</td>
        <td style="padding: 10px; border: 1px solid #e0e0e0;">${lead.bestTimeToCall || 'Not provided'}</td>
      </tr>
    </table>
    
    <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 6px; border-left: 4px solid #1a1a2e; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <strong>Conversation Summary:</strong>
      <p style="margin: 8px 0 0; color: #444; line-height: 1.5;">${lead.conversationSummary || 'No summary available.'}</p>
    </div>
    
    <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">
      Lead captured at ${lead.capturedAt || new Date().toLocaleString()} via website chatbot
    </p>
  </div>
</div>
  `;

  try {
    await transporter.sendMail({
      from: `"${companyName} Chatbot" <${emailFrom}>`,
      to: emailTo,
      subject,
      html: htmlBody,
    });
    console.log(`Successfully sent lead notification email for: ${lead.name}`);
  } catch (error) {
    console.error('Error sending lead notification email:', error);
    throw error;
  }
}
