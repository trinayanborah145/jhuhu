import { NextRequest, NextResponse } from 'next/server';
import { appendLeadToSheet } from '@/lib/sheets';
import { sendLeadNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadData } = body;

    if (!leadData) {
      return NextResponse.json({ error: 'Missing leadData in request body.' }, { status: 400 });
    }

    // Call both operations in parallel
    const results = await Promise.allSettled([
      appendLeadToSheet(leadData),
      sendLeadNotification(leadData),
    ]);

    const sheetResult = results[0];
    const emailResult = results[1];

    const sheetSuccess = sheetResult.status === 'fulfilled';
    const emailSuccess = emailResult.status === 'fulfilled';

    // Returns success if at least one succeeded
    if (sheetSuccess || emailSuccess) {
      return NextResponse.json({
        success: true,
        sheetSaved: sheetSuccess,
        emailSent: emailSuccess,
      });
    }

    // Returns failure only if both failed
    const sheetError = sheetResult.status === 'rejected' ? String(sheetResult.reason) : 'Unknown error';
    const emailError = emailResult.status === 'rejected' ? String(emailResult.reason) : 'Unknown error';

    console.error(`Submission failed. Sheet Error: ${sheetError}. Email Error: ${emailError}`);
    
    return NextResponse.json(
      {
        success: false,
        error: `Both Google Sheet and Email notifications failed. Sheets: ${sheetError}; Email: ${emailError}`,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error in submit-lead API route:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
