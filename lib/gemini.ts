export async function callGemini(
  systemPrompt: string,
  messages: { role: 'user' | 'assistant'; content: string }[],
  timeoutMs: number = 15000,
  maxRetries: number = 3
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not configured.');
  }

  // Map messages to Gemini formats (roles are 'user' and 'model')
  const contents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            maxOutputTokens: 600,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        let parsedError = errorText;
        try {
          const jsonError = JSON.parse(errorText);
          parsedError = jsonError.error?.message || errorText;
        } catch(e) {}
        throw new Error(`Gemini API error ${response.status}: ${parsedError}`);
      }

      const data = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('Empty response from Gemini API.');
      }

      return candidateText;
    } catch (error: any) {
      clearTimeout(timeoutId);
      lastError = error;
      console.warn(`Gemini API attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        // Wait before retrying (1s, 2s, ...)
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }

  throw lastError;
}
