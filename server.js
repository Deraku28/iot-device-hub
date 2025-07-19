const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Device data file path
const DEVICES_FILE = 'devices.json';

// Ensure devices.json exists
async function ensureDevicesFile() {
    try {
        await fs.access(DEVICES_FILE);
    } catch (error) {
        // File doesn't exist, create it with empty data
        const emptyData = {
            devices: [],
            lastUpdated: null
        };
        await fs.writeFile(DEVICES_FILE, JSON.stringify(emptyData, null, 2));
        console.log('Created devices.json with empty data');
    }
}

// GET /devices.json - Retrieve all devices
app.get('/devices.json', async (req, res) => {
    try {
        await ensureDevicesFile();
        const data = await fs.readFile(DEVICES_FILE, 'utf8');
        const devices = JSON.parse(data);
        
        res.json(devices);
        console.log('Devices retrieved successfully');
    } catch (error) {
        console.error('Error reading devices:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to read devices data'
        });
    }
});

// POST /devices.json - Save devices data
app.post('/devices.json', async (req, res) => {
    try {
        const deviceData = req.body;
        
        // Validate the data structure
        if (!deviceData || !Array.isArray(deviceData.devices)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid data format. Expected { devices: [] }'
            });
        }
        
        // Add timestamp
        deviceData.lastUpdated = new Date().toISOString();
        
        // Save to file
        await fs.writeFile(DEVICES_FILE, JSON.stringify(deviceData, null, 2));
        
        res.json({
            status: 'success',
            message: 'Devices saved successfully',
            deviceCount: deviceData.devices.length
        });
        
        console.log(`Devices saved successfully. Total devices: ${deviceData.devices.length}`);
    } catch (error) {
        console.error('Error saving devices:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to save devices data'
        });
    }
});

// GET / - Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// GET /add-device - Serve the add device page
app.get('/add-device', (req, res) => {
    res.sendFile(path.join(__dirname, 'add-device.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint not found'
    });
});

// Start server
async function startServer() {
    try {
        await ensureDevicesFile();
        
        app.listen(PORT, () => {
            console.log('🚀 IoT Device Hub Server Started!');
            console.log(`📍 Server running on: http://localhost:${PORT}`);
            console.log(`📱 Add Device Page: http://localhost:${PORT}/add-device`);
            console.log(`💾 Device Storage: ${DEVICES_FILE}`);
            console.log('Press Ctrl+C to stop the server');
            console.log('─'.repeat(50));
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down IoT Device Hub server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down IoT Device Hub server...');
    process.exit(0);
});

// Start the server
startServer(); 