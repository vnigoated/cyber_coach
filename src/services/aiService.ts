// Unified AI service using Google Gemini only
class AiService {
  private geminiApiKey: string | undefined;
  // Hardcoded per request
  private readonly geminiModel = 'gemini-2.0-flash';
  private readonly geminiBaseUrl = 'https://generativelanguage.googleapis.com/v1beta';

  constructor() {
    // Only take API key from Vite env. Ensure .env contains VITE_GEMINI_API_KEY
    this.geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || undefined;
  }

  isGeminiEnabled(): boolean {
    return Boolean(this.geminiApiKey);
  }

  private async chatGemini(prompt: string, systemPrompt?: string): Promise<string> {
  if (!this.geminiApiKey) throw new Error('Gemini API key missing. Set VITE_GEMINI_API_KEY in your .env');

  // Hardcoded model and endpoint
  const endpoint = `${this.geminiBaseUrl}/models/${this.geminiModel}:generateContent?key=${this.geminiApiKey}`;
    const contents = {
      contents: [
        ...(systemPrompt ? [{ role: 'user', parts: [{ text: `System: ${systemPrompt}` }] }] : []),
        { role: 'user', parts: [{ text: prompt }] },
      ],
      generationConfig: { temperature: 0.7 },
    };

    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contents),
    });

    if (!resp.ok) {
      let errText = await resp.text();
      try {
        const j = JSON.parse(errText) as unknown;
        if (j && typeof j === 'object' && 'error' in j) {
          const jj = j as Record<string, unknown>;
          const errField = jj.error as unknown;
          if (errField && typeof errField === 'object' && 'message' in (errField as Record<string, unknown>)) {
            errText = String((errField as Record<string, unknown>)['message']);
          } else {
            errText = JSON.stringify(jj);
          }
        } else {
          errText = JSON.stringify(j);
        }
      } catch {
        // ignore parse errors and keep raw text
      }
      const msg = `Gemini error ${resp.status}: ${errText}`;
      console.error(msg);
      throw new Error(msg);
    }

  const data: unknown = await resp.json();
    let text = '';
    try {
      if (data && typeof data === 'object') {
        const candidates = (data as Record<string, unknown>)['candidates'];
        if (Array.isArray(candidates) && candidates.length > 0) {
          const first = candidates[0] as Record<string, unknown>;
          const content = first['content'] as Record<string, unknown> | undefined;
          const parts = content ? content['parts'] as unknown[] : undefined;
          if (Array.isArray(parts)) {
            text = parts.map(p => {
              if (p && typeof p === 'object' && 'text' in (p as Record<string, unknown>)) {
                return String((p as Record<string, unknown>)['text']);
              }
              return '';
            }).join('');
          }
        }
      }
    } catch {
      // best-effort extraction only
      text = '';
    }
    return text.trim();
  }

  async chat(prompt: string, systemPrompt?: string): Promise<string> {
    if (this.isGeminiEnabled()) {
      return this.chatGemini(prompt, systemPrompt);
    }
    throw new Error('No AI provider configured. Set VITE_GEMINI_API_KEY.');
  }

  async generateQuestions(topics: string[], difficulty: 'easy' | 'medium' | 'hard', count: number = 5) {
    const system =
      'You generate high-quality cybersecurity multiple-choice questions. Return a strict JSON array of objects: {id, question, options, correctAnswer, explanation}. Do not include prose.';
    const prompt = `Topics: ${topics.join(', ')}\nDifficulty: ${difficulty}\nCount: ${count}\nReturn JSON only.`;

    const text = await this.chat(prompt, system);
    try {
      const start = text.indexOf('[');
      const end = text.lastIndexOf(']');
      return JSON.parse(text.slice(start, end + 1));
    } catch {
      return topics.slice(0, count).map((t, i) => ({
        id: `gen-${i}`,
        question: `Placeholder question about ${t}?`,
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
        explanation: `Review topic ${t}.`,
      }));
    }
  }
}

export const aiService = new AiService();
export default AiService;
