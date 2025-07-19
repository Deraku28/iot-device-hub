# IoT Device Hub

A comprehensive web application for managing and controlling IoT devices in your smart home.

## Features

- **Device Dashboard**: View and control all your IoT devices
- **Add New Devices**: Multi-step wizard for adding new devices with automatic control assignment
- **Device Categorization**: Smart categorization for different device types (Climate, Security, Lighting, etc.)
- **Real-time Controls**: Device-specific controls based on device type
- **Plan Management**: Different IoT plans for various device categories
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Device Categories Supported

- **Climate Control**: AC, Heater, Fan (Temperature, Mode, Fan Speed)
- **Smart Lighting**: Bulbs, Switches, LED Strips (Brightness, Color, Scheduling)
- **Security**: Cameras, Locks, Sensors (Recording, Motion Detection, Lock Status)
- **Irrigation**: Sprinklers, Drip Systems (Water Flow, Scheduling, Zones)
- **Energy Monitor**: Smart Meters, Solar Panels (Monitoring, Alerts)
- **Smart Appliances**: Refrigerator, Washer (Temperature, Cycles)
- **Environmental Sensors**: Temperature, Humidity, Air Quality (Monitoring, Alerts)

## Installation

1. **Install Node.js** (version 14 or higher)

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   - Main Dashboard: http://localhost:3000/index.html
   - Add Device Page: http://localhost:3000/add-device.html

## Troubleshooting

### If you get "Failed to add device" error:

1. **Check if server is running**:
   ```bash
   npm start
   ```
   You should see: "IoT Device Hub server running on http://localhost:3000"

2. **Test the API**:
   ```bash
   node test-server.js
   ```
   This will test if the server endpoints are working correctly.

3. **Check browser console**:
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for error messages when adding devices

4. **Fallback options**:
   - The app will automatically fallback to localStorage if the server is not available
   - Devices will still be saved locally in your browser

### Common Issues:

- **Port 3000 already in use**: Change the port in `server.js` or kill the process using port 3000
- **CORS errors**: The server includes CORS headers, but if you're accessing from a different domain, you may need to configure it
- **File permissions**: Make sure the app has write permissions to create/update `devices.json`

## How to Use

### Adding a New Device

1. Click "Add Device" on the main dashboard
2. Follow the 4-step process:
   - **Step 1**: Enter device identifier (SIM, MAC, QR, or Manual)
   - **Step 2**: Provide device name, location, category, and type
   - **Step 3**: Configure device-specific controls (automatically generated)
   - **Step 4**: Select appropriate IoT plan
3. Device is automatically added to your hub

### Managing Devices

- **View Devices**: All devices appear on the main dashboard
- **Control Devices**: Use device-specific controls (temperature, brightness, etc.)
- **Toggle Power**: Turn devices on/off
- **Monitor Usage**: Track data usage for each device

## Data Storage

- Devices are stored in `devices.json`
- The server automatically saves changes when devices are modified
- Data persists between sessions

## File Structure

```
iot-device-hub/
├── index.html          # Main dashboard
├── add-device.html     # Add device wizard
├── devices.json        # Device data storage
├── server.js           # Express server
├── package.json        # Dependencies
└── README.md          # This file
```

## API Endpoints

- `GET /api/devices` - Retrieve all devices
- `POST /api/devices` - Save devices data

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Charts**: Chart.js
- **Backend**: Node.js, Express
- **Data**: JSON file storage

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

To run in development mode:
```bash
npm run dev
```

## License

MIT License - feel free to use and modify as needed. 