import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.ANTHROPIC_API_KEY;

if (!apiKey && process.env.NODE_ENV === 'production') {
  console.warn('Warning: ANTHROPIC_API_KEY environment variable is not set.');
}

export const anthropic = new Anthropic({
  apiKey: apiKey || 'mock-key-for-build-or-dev',
});
