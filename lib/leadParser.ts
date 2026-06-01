import { LeadData } from '../types/chat';

export function parseLeadMessage(text: string): {
  reply: string;
  leadCaptured: boolean;
  leadData: LeadData | null;
} {
  // Regex to match the LEAD_CAPTURED: prefix and its trailing JSON object
  const regex = /LEAD_CAPTURED:\s*(\{[\s\S]*\})/;
  const match = text.match(regex);

  if (!match) {
    return {
      reply: text,
      leadCaptured: false,
      leadData: null,
    };
  }

  const jsonStr = match[1];
  const reply = text.replace(regex, '').trim();

  try {
    const leadData = JSON.parse(jsonStr) as LeadData;
    
    // Clean up lead fields and ensure capturedAt is populated
    const cleanedLeadData: LeadData = {
      name: leadData.name || null,
      phone: leadData.phone || null,
      email: leadData.email || null,
      projectType: leadData.projectType || null,
      projectDescription: leadData.projectDescription || null,
      budgetRange: leadData.budgetRange || null,
      timeline: leadData.timeline || null,
      location: leadData.location || null,
      bestTimeToCall: leadData.bestTimeToCall || null,
      capturedAt: leadData.capturedAt || new Date().toISOString(),
      conversationSummary: leadData.conversationSummary || '',
    };

    return {
      reply,
      leadCaptured: true,
      leadData: cleanedLeadData,
    };
  } catch (error) {
    console.error('Failed to parse captured lead JSON payload:', error);
    // Strip the raw token and json from the reply even if parsing failed, so it doesn't leak
    const strippedReply = text.replace(/LEAD_CAPTURED:[\s\S]*/, '').trim();
    return {
      reply: strippedReply,
      leadCaptured: false,
      leadData: null,
    };
  }
}
