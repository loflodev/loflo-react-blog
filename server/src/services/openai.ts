import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface BlogPostPrompt {
  topic?: string;
  category: string;
}

export interface GeneratedPost {
  title: string;
  content: string;
  tags: string[];
}

const SYSTEM_PROMPT = `You are a professional blog post writer. Create engaging, well-researched content that provides value to readers.
Follow these guidelines:
1. Write in a clear, conversational tone
2. Include relevant examples and explanations
3. Format content with proper markdown headings and sections
4. Keep content informative yet accessible`;

export async function generateBlogPost(prompt: BlogPostPrompt): Promise<GeneratedPost> {
  const userPrompt = `Create a blog post about ${prompt.topic || 'a relevant topic'} in the ${prompt.category} category.
Include a compelling title, well-structured content with markdown formatting, and relevant tags.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    if (!response) throw new Error('No response from OpenAI');

    // Parse the response to extract title, content, and tags
    const lines = response.split('\n');
    const title = lines[0].replace(/^#\s*/, '');
    const tags = lines[lines.length - 1]
      .replace(/^tags:\s*/i, '')
      .split(',')
      .map(tag => tag.trim());
    const content = lines.slice(1, -1).join('\n').trim();

    return {
      title,
      content,
      tags,
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw error;
  }
}
