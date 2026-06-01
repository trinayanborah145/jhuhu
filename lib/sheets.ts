import { google } from 'googleapis';
import { LeadData } from '../types/chat';

let headerEnsured = false;

function getSheetsClient() {
  const base64Json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!base64Json) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not configured in environment variables.');
  }

  try {
    const decoded = Buffer.from(base64Json, 'base64').toString('utf8');
    const credentials = JSON.parse(decoded);
    
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
    });
    
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Failed to parse Google Service Account credentials:', error);
    throw new Error('Invalid Google Service Account JSON configuration.');
  }
}

export async function ensureHeaderRow(): Promise<void> {
  if (headerEnsured) return;

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    console.warn('GOOGLE_SHEET_ID is not configured. Skipping header enforcement.');
    return;
  }

  try {
    const sheets = getSheetsClient();
    
    // Read the first row to check if it's empty (using range 'A1:L1' to default to the first sheet)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:L1',
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0 || !rows[0] || rows[0].length === 0) {
      const headers = [
        'Timestamp',
        'Name',
        'Phone',
        'Email',
        'Project Type',
        'Project Description',
        'Budget Range',
        'Timeline',
        'Location',
        'Best Time to Call',
        'Conversation Summary',
        'Source'
      ];
      
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'A1:L1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers]
        }
      });
      console.log('Google Sheet header row initialized successfully.');
    }
    headerEnsured = true;
  } catch (error) {
    console.error('Error in ensureHeaderRow:', error);
    // Do not throw so that lead saving is not blocked if it's just header check failure
  }
}

export async function appendLeadToSheet(lead: LeadData): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID is not configured in environment variables.');
  }

  try {
    // Ensure header exists before appending
    await ensureHeaderRow();

    const sheets = getSheetsClient();
    
    const values = [
      [
        lead.capturedAt || new Date().toISOString(),
        lead.name || '',
        lead.phone || '',
        lead.email || '',
        lead.projectType || '',
        lead.projectDescription || '',
        lead.budgetRange || '',
        lead.timeline || '',
        lead.location || '',
        lead.bestTimeToCall || '',
        lead.conversationSummary || '',
        'Website Chatbot'
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });
    
    console.log(`Successfully appended lead to Google Sheet: ${lead.name}`);
  } catch (error) {
    console.error('Error appending lead to Google Sheet:', error);
    throw error;
  }
}
