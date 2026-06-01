import { NextRequest, NextResponse } from 'next/server';
import { anthropic } from '@/lib/anthropic';
import { callGemini } from '@/lib/gemini';
import { parseLeadMessage } from '@/lib/leadParser';
import { appendLeadToSheet } from '@/lib/sheets';
import { sendLeadNotification } from '@/lib/email';
import { Message } from '@/types/chat';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, conversationId, isInitial } = body;

    const companyPhone = process.env.COMPANY_PHONE || '+44 20 7946 0958';
    const fallbackMessage = `Sorry, I'm having a moment — please try again or call us directly on ${companyPhone}`;

    if (!isInitial && (!messages || !Array.isArray(messages))) {
      return NextResponse.json({ error: 'Invalid messages array.' }, { status: 400 });
    }

    // Dynamic system prompt using environment variables
    const systemPrompt = `You are a friendly, professional sales assistant for ${process.env.COMPANY_NAME || 'BuildRight Construction'}, a trusted construction company serving ${process.env.COMPANY_SERVICE_AREA || 'London and surrounding home counties'}. Your name is Rahul.

Your primary goal is to warmly engage website visitors, understand their construction project needs, and collect their contact details so that ${process.env.OWNER_FIRST_NAME || 'Marcus'} from the team can follow up personally.

PERSONALITY:
- Warm, approachable, and genuinely helpful — like a knowledgeable friend in the industry
- Professional but never stiff or robotic
- Concise — keep responses to 2–3 sentences maximum per turn
- Show genuine interest in the visitor's project
- Use natural conversational language, not corporate speak
- Occasionally use light reassurance ("Great choice", "That's a popular project this time of year", "Sounds exciting!")

CONVERSATION FLOW — follow this sequence naturally, do not rush:

1. GREETING: Welcome the visitor warmly. Ask what kind of project they have in mind.

2. PROJECT DISCOVERY: Ask open-ended questions to understand:
   - Type of project (residential, commercial, renovation, new build, extension, roofing, etc.)
   - Brief description of what they want done
   - Rough size or scope if relevant

3. QUALIFYING: Gently explore:
   - Their rough budget range (give bracket options if they hesitate: "under £10k, £10k–£30k, £30k–£80k, £80k+")
   - Their ideal start date or timeline ("Is this something you're planning to start soon, or more of a longer-term plan?")
   - Their location or postcode area

4. CONTACT COLLECTION: Once you have project details, naturally transition:
   "That sounds like a great project — I'd love to have ${process.env.OWNER_FIRST_NAME || 'Marcus'} give you a call to discuss this properly and arrange a free site visit. Could I grab your name and best contact number?"
   Then also ask for:
   - Their email address
   - Best time to be called

5. CONFIRMATION: Summarise what you've collected back to them. Tell them:
   "${process.env.OWNER_FIRST_NAME || 'Marcus'} will be in touch within 2 working hours. Is there anything else you'd like to mention before we wrap up?"

6. CLOSING: Thank them warmly. Let them know they can also call directly on ${process.env.COMPANY_PHONE || '+44 20 7946 0958'} if they prefer.

RULES:
- LANGUAGE: You must reply in the exact language the user uses. If they speak in English, reply in English. If they speak in Assamese, you MUST reply in Assamese written in the Roman script (e.g., "project r daam tu kiman", "apuni kenekua aase"). Do not use the Assamese script (অসমীয়া).
- Never make up prices, timelines, or availability — you are gathering info, not quoting
- Never promise specific dates or commitments beyond the callback timeframe
- If asked something you cannot answer, say "That's a great question for ${process.env.OWNER_FIRST_NAME || 'Marcus'} — I'll make sure to note that for the call"
- If the visitor seems to be spam or testing, respond politely but do not capture as a lead
- Keep the conversation moving — do not ask more than one question per message
- Once all required fields are collected (name, phone, project type, budget, timeline, location), output a special JSON block on a new line in this exact format so the system can detect lead completion:

LEAD_CAPTURED:{"name":"...","phone":"...","email":"...","projectType":"...","projectDescription":"...","budgetRange":"...","timeline":"...","location":"...","bestTimeToCall":"...","conversationSummary":"..."}

This JSON line will be stripped from the visible response before showing to the user.`;

    let responseText = '';
    const geminiApiKey = process.env.GEMINI_API_KEY;

    try {
      if (geminiApiKey && geminiApiKey !== 'your_gemini_api_key_here') {
        // Map messages history to Gemini format
        const geminiMessages = isInitial || !messages || messages.length === 0
          ? [{ role: 'user' as const, content: 'Hello! Please welcome me to the site and ask how you can help me today.' }]
          : messages.map((msg: Message) => ({
              role: msg.role,
              content: msg.content,
            }));

        // Call Google Gemini API
        responseText = await callGemini(systemPrompt, geminiMessages, 15000);
      } else {
        // Map messages history to Anthropic format
        let anthropicMessages = [];
        if (isInitial || !messages || messages.length === 0) {
          // Prompt the bot to greet the user
          anthropicMessages = [
            { role: 'user', content: 'Hello! Please welcome me to the site and ask how you can help me today.' }
          ];
        } else {
          anthropicMessages = messages.map((msg: Message) => ({
            role: msg.role,
            content: msg.content,
          }));
        }

        // Claude API call with a 15-second timeout
        const response = await anthropic.messages.create(
          {
            model: 'claude-sonnet-4-20250514',
            max_tokens: 600,
            system: systemPrompt,
            messages: anthropicMessages,
          },
          {
            timeout: 15000,
          }
        );

        const firstContent = response.content[0];
        if (firstContent && firstContent.type === 'text') {
          responseText = firstContent.text;
        } else {
          throw new Error('No text content returned from Claude API');
        }
      }
    } catch (apiError: any) {
      console.error('AI API execution error:', apiError);
      
      const errorMessage = apiError?.message || String(apiError);
      // Return the actual error message to the user instead of a generic fallback
      return NextResponse.json({
        reply: `Sorry, I'm having a moment. The exact problem is: ${errorMessage}`,
        leadCaptured: false,
      });
    }

    // Parse response for lead completion token
    const parsed = parseLeadMessage(responseText);

    if (parsed.leadCaptured && parsed.leadData) {
      // Process submission in parallel without blocking client response entirely,
      // but await to ensure the serverless function finishes execution on Vercel.
      try {
        await Promise.allSettled([
          appendLeadToSheet(parsed.leadData),
          sendLeadNotification(parsed.leadData),
        ]);
      } catch (submitError) {
        console.error('Lead submission failure from chat route:', submitError);
      }

      return NextResponse.json({
        reply: parsed.reply,
        leadCaptured: true,
        leadData: parsed.leadData,
      });
    }

    return NextResponse.json({
      reply: parsed.reply,
      leadCaptured: false,
    });
  } catch (error) {
    console.error('Internal error in chat API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
