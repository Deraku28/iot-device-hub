const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
    console.log('Testing IoT Device Hub API...\n');

    try {
        // Test GET /api/devices
        console.log('1. Testing GET /api/devices...');
        const getResponse = await fetch(`${BASE_URL}/api/devices`);
        console.log('   Status:', getResponse.status);
        
        if (getResponse.ok) {
            const data = await getResponse.json();
            console.log('   Success! Loaded', data.devices?.length || 0, 'devices');
            console.log('   Data:', JSON.stringify(data, null, 2));
        } else {
            const error = await getResponse.text();
            console.log('   Error:', error);
        }

        console.log('\n2. Testing POST /api/devices...');
        
        // Test data
        const testDevice = {
            devices: [
                {
                    id: Date.now(),
                    name: 'Test Device',
                    type: 'Test Type',
                    category: 'test',
                    status: 'active',
                    icon: 'zap',
                    location: 'Test Location',
                    settings: { test: true },
                    usage: 0,
                    plan: 'Basic IoT',
                    addedDate: new Date().toISOString()
                }
            ],
            lastUpdated: new Date().toISOString()
        };

        const postResponse = await fetch(`${BASE_URL}/api/devices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testDevice)
        });
        
        console.log('   Status:', postResponse.status);
        
        if (postResponse.ok) {
            const result = await postResponse.json();
            console.log('   Success!', result.message);
            console.log('   Result:', JSON.stringify(result, null, 2));
        } else {
            const error = await postResponse.text();
            console.log('   Error:', error);
        }

        console.log('\n3. Testing GET /api/devices again to verify save...');
        const getResponse2 = await fetch(`${BASE_URL}/api/devices`);
        console.log('   Status:', getResponse2.status);
        
        if (getResponse2.ok) {
            const data = await getResponse2.json();
            console.log('   Success! Now have', data.devices?.length || 0, 'devices');
        } else {
            const error = await getResponse2.text();
            console.log('   Error:', error);
        }

    } catch (error) {
        console.error('Test failed:', error.message);
        console.log('\nMake sure the server is running with: npm start');
    }
}

testAPI(); 