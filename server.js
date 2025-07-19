const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Routes
app.get('/api/devices', async (req, res) => {
    try {
        console.log('GET /api/devices - Reading devices file...');
        const data = await fs.readFile('devices.json', 'utf8');
        const parsedData = JSON.parse(data);
        console.log('GET /api/devices - Successfully loaded', parsedData.devices?.length || 0, 'devices');
        res.json(parsedData);
    } catch (error) {
        console.error('GET /api/devices - Error reading devices:', error);
        
        // If file doesn't exist, create it with empty data
        if (error.code === 'ENOENT') {
            console.log('GET /api/devices - File not found, creating empty devices file');
            const emptyData = { devices: [], lastUpdated: new Date().toISOString() };
            try {
                await fs.writeFile('devices.json', JSON.stringify(emptyData, null, 2));
                res.json(emptyData);
            } catch (writeError) {
                console.error('GET /api/devices - Error creating empty file:', writeError);
                res.status(500).json({ error: 'Failed to create devices file' });
            }
        } else {
            res.status(500).json({ error: 'Failed to load devices', details: error.message });
        }
    }
});

app.post('/api/devices', async (req, res) => {
    try {
        console.log('POST /api/devices - Received data:', req.body);
        
        if (!req.body || !Array.isArray(req.body.devices)) {
            console.error('POST /api/devices - Invalid data format');
            return res.status(400).json({ error: 'Invalid data format. Expected devices array.' });
        }
        
        const data = {
            devices: req.body.devices,
            lastUpdated: new Date().toISOString()
        };
        
        console.log('POST /api/devices - Saving', data.devices.length, 'devices...');
        await fs.writeFile('devices.json', JSON.stringify(data, null, 2));
        console.log('POST /api/devices - Successfully saved devices');
        
        res.json({ success: true, message: 'Devices saved successfully', deviceCount: data.devices.length });
    } catch (error) {
        console.error('POST /api/devices - Error saving devices:', error);
        res.status(500).json({ error: 'Failed to save devices', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`IoT Device Hub server running on http://localhost:${PORT}`);
    console.log(`Main page: http://localhost:${PORT}/index.html`);
    console.log(`Add device page: http://localhost:${PORT}/add-device.html`);
}); 