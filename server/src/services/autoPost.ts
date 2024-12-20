import cron from 'node-cron';
import { generateBlogPost } from './openai';
import { savePost } from '../db/post';

const BLOG_CATEGORIES = [
  'Technology',
  'Programming',
  'Web Development',
  'Software Engineering',
  'AI and Machine Learning'
];

const BLOG_TOPICS = [
  'Latest JavaScript Features',
  'React Best Practices',
  'Web Performance Optimization',
  'Modern API Design',
  'Frontend Development Trends'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

async function createAutomatedPost() {
  try {
    // Generate blog post content
    const post = await generateBlogPost({
      topic: getRandomItem(BLOG_TOPICS),
      category: getRandomItem(BLOG_CATEGORIES),
    });

    // Save to database
    await savePost({
      title: post.title,
      content: post.content,
      author: 'AI Writer',
      category: post.tags[0] || 'Technology',
      tags: post.tags,
      view: 0,
      createAt: new Date(),
    });

    console.log('Successfully created automated blog post:', post.title);
  } catch (error) {
    console.error('Error creating automated blog post:', error);
  }
}

// Schedule weekly post creation (runs every Monday at 9:00 AM)
export function startAutomatedPosting() {
  cron.schedule('0 9 * * 1', createAutomatedPost);
  console.log('Automated blog posting scheduled');
}
