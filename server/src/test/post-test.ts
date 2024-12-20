import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
    }
});

async function testPost() {
    try {
        // First try without authentication (should fail)
        console.log('Testing without authentication...');
        try {
            await api.post('/post/auto', {
                author: 'AI Assistant',
                category: 'Technology',
                topic: 'The Future of Web Development',
                token: 'dummy-token'
            });
        } catch (error) {
            console.log('Expected error without auth:', error.response?.data);
        }

        // Register a new user
        console.log('\nRegistering new user...');
        try {
            const registerResponse = await api.post('/auth/register', {
                email: 'test@example.com',
                password: 'testpassword123',
                username: 'testuser'
            });
            console.log('Registration successful:', registerResponse.data);
        } catch (error) {
            if (error.response?.data?.error !== 'User already exist') {
                throw error;
            }
            console.log('User already exists, proceeding to login...');
        }

        // Now try with proper authentication
        console.log('\nLogging in...');
        const loginResponse = await api.post('/auth/login', {
            email: 'test@example.com',
            password: 'testpassword123'
        });
        console.log('Login successful:', loginResponse.data);
        
        // Get the cookie from the login response
        const cookie = loginResponse.headers['set-cookie'][0].split(';')[0];
        console.log('Using cookie:', cookie);
        
        // Create a new instance with the cookie
        const authenticatedApi = axios.create({
            baseURL: 'http://localhost:8080',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:5173',
                'Cookie': cookie
            }
        });
        
        // Now try to create a post with authentication
        console.log('\nTesting auto post with authentication...');
        const postResponse = await authenticatedApi.post('/post/auto', {
            author: 'AI Assistant',
            category: 'Technology',
            topic: 'The Future of Web Development',
            token: 'dummy-token'
        });

        console.log('\nSuccess! Generated post:');
        console.log('Title:', postResponse.data.post.title);
        console.log('Category:', postResponse.data.post.category);
        console.log('Tags:', postResponse.data.post.tags);
        console.log('\nContent Preview:', postResponse.data.post.content.substring(0, 200) + '...');

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        if (error.response) {
            console.error('Response headers:', error.response.headers);
            console.error('Request headers:', error.response.config.headers);
        }
    }
}

// Run the test
testPost();
