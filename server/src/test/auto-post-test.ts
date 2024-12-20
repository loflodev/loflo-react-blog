import axios from 'axios';

async function testAutoPost() {
    try {
        console.log('Testing auto post generation...');
        
        const response = await axios.post('http://localhost:8080/post/auto', {
            author: 'AI Assistant',
            category: 'Technology',
            topic: 'The Future of Web Development',
            token: 'your-auth-token' // Replace with actual token if needed
        });

        console.log('Success! Generated and saved post:');
        console.log('Title:', response.data.post.title);
        console.log('Category:', response.data.post.category);
        console.log('Tags:', response.data.post.tags);
        console.log('\nContent Preview:', response.data.post.content.substring(0, 200) + '...');
    } catch (error) {
        console.error('Error testing auto post:', error.response?.data || error.message);
    }
}

// Run the test
testAutoPost();
