import axios from 'axios';

async function testAuth() {
    try {
        // 1. Register a new user
        console.log('Registering new user...');
        const registerResponse = await axios.post('http://localhost:8080/auth/register', {
            email: 'test@example.com',
            password: 'testpassword123',
            username: 'testuser'
        });
        console.log('Registration response:', registerResponse.data);

        // 2. Login with the new user
        console.log('\nLogging in...');
        const loginResponse = await axios.post('http://localhost:8080/auth/login', {
            email: 'test@example.com',
            password: 'testpassword123'
        });
        console.log('Login response:', loginResponse.data);

        // Store the cookie for future requests
        const sessionCookie = loginResponse.headers['set-cookie'];
        console.log('\nSession cookie:', sessionCookie);

        // 3. Test auto post with authentication
        console.log('\nTesting auto post with authentication...');
        const postResponse = await axios.post('http://localhost:8080/post/auto', {
            author: 'AI Assistant',
            category: 'Technology',
            topic: 'The Future of Web Development'
        }, {
            headers: {
                Cookie: sessionCookie
            }
        });

        console.log('\nSuccess! Generated and saved post:');
        console.log('Title:', postResponse.data.post.title);
        console.log('Category:', postResponse.data.post.category);
        console.log('Tags:', postResponse.data.post.tags);
        console.log('\nContent Preview:', postResponse.data.post.content.substring(0, 200) + '...');

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        if (error.response?.data?.error === 'User already exists') {
            // If user exists, try logging in directly
            try {
                console.log('\nUser exists, trying to login...');
                const loginResponse = await axios.post('http://localhost:8080/auth/login', {
                    email: 'test@example.com',
                    password: 'testpassword123'
                });
                console.log('Login response:', loginResponse.data);

                // Store the cookie for future requests
                const sessionCookie = loginResponse.headers['set-cookie'];
                console.log('\nSession cookie:', sessionCookie);

                // Test auto post with authentication
                console.log('\nTesting auto post with authentication...');
                const postResponse = await axios.post('http://localhost:8080/post/auto', {
                    author: 'AI Assistant',
                    category: 'Technology',
                    topic: 'The Future of Web Development'
                }, {
                    headers: {
                        Cookie: sessionCookie
                    }
                });

                console.log('\nSuccess! Generated and saved post:');
                console.log('Title:', postResponse.data.post.title);
                console.log('Category:', postResponse.data.post.category);
                console.log('Tags:', postResponse.data.post.tags);
                console.log('\nContent Preview:', postResponse.data.post.content.substring(0, 200) + '...');
            } catch (loginError) {
                console.error('Login Error:', loginError.response?.data || loginError.message);
            }
        }
    }
}

// Run the test
testAuth();
