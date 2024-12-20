import { generateBlogPost } from '../services/openai';

async function testOpenAI() {
    try {
        console.log('Testing OpenAI integration...');
        const result = await generateBlogPost({
            category: 'technology',
            topic: 'The Future of AI'
        });
        
        console.log('Successfully generated blog post:');
        console.log('Title:', result.title);
        console.log('Tags:', result.tags);
        console.log('\nContent Preview:', result.content.substring(0, 200) + '...');
    } catch (error) {
        console.error('Error testing OpenAI:', error);
    }
}

testOpenAI();
