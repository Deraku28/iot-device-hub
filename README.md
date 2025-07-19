# IoT Device Hub

A comprehensive IoT device management system similar to Google Home or Alexa, built with HTML, CSS, and JavaScript.

## Features

- **Device Management**: Add, remove, and control IoT devices
- **Device Categories**: Lighting, Security, Climate, Entertainment, Appliances, and more
- **Smart Controls**: Device-specific controls based on category (brightness, temperature, locks, etc.)
- **Location Management**: Organize devices by room/location
- **Local Storage**: Devices are stored locally in JSON format
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes
- **Real-time Status**: Monitor device online/offline status

## Device Categories Supported

### 🏠 Lighting
- Smart Bulbs (brightness, color control)
- Smart Switches (on/off control)
- Smart Dimmers (brightness control)
- LED Strips (brightness, color control)
- Smart Plugs (power control)

### 🔒 Security
- Security Cameras (recording, motion detection)
- Smart Locks (lock/unlock control)
- Motion Sensors (sensitivity control)
- Door/Window Sensors (status monitoring)

### 🌡️ Climate
- Smart Thermostats (temperature, mode control)
- Smart AC Units (temperature, mode control)
- Smart Fans (speed control)
- Smart Heaters (temperature control)
- Humidity Sensors (monitoring)

### 📺 Entertainment
- Smart TVs (power, volume, input control)
- Smart Speakers (power, volume control)
- Streaming Devices (power control)
- Gaming Consoles (power control)

### 🏠 Appliances
- Smart Washers (power, cycle control)
- Smart Dryers (power, cycle control)
- Smart Fridges (power, temperature control)
- Smart Dishwashers (power, cycle control)
- Smart Ovens (power, temperature, timer control)

## How to Run

### Option 1: Using Node.js Server (Recommended)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8000
   ```

4. **Add devices** by clicking the "Add Device" button on the dashboard

### Option 2: Direct File Opening

1. **Open `index.html`** directly in your browser
2. **Note**: Some features may be limited due to browser security restrictions

### Option 3: Using http-server (Alternative)

1. **Install http-server** (if not already installed):
   ```bash
   npm install -g http-server
   ```

2. **Start the server**:
   ```bash
   http-server -p 8000
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8000
   ```

## File Structure

```
iot-device-hub/
├── index.html          # Main dashboard page
├── add-device.html     # Device addition wizard
├── devices.json        # Local device storage
├── server.js          # Node.js Express server
├── package.json       # Node.js dependencies
└── README.md          # This file
```

## Adding Devices

1. **Open the dashboard** (`index.html`)
2. **Click "Add Device"** button
3. **Follow the 5-step wizard**:
   - Step 1: Select device category
   - Step 2: Choose specific device type
   - Step 3: Configure device settings
   - Step 4: Set up Wi-Fi connection
   - Step 5: Review and add device

## Device Data Storage

Devices are stored in two locations:
- **Primary**: Browser's localStorage (for immediate access)
- **Backup**: `devices.json` file (for persistence and portability)

## Device Control Features

### Smart Bulbs & LED Strips
- Brightness control (0-100%)
- Color selection
- Power on/off

### Smart Locks
- Lock/unlock control
- Status monitoring

### Smart Thermostats & AC
- Temperature control
- Mode selection (Auto, Heat, Cool, Fan)
- Power control

### Security Cameras
- Recording quality selection
- Motion detection toggle
- Power control

### Smart Switches & Plugs
- Power on/off control

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Troubleshooting

### Devices not loading?
- Check if `devices.json` exists and is valid JSON
- Clear browser cache and localStorage
- Restart the server

### Can't add devices?
- Make sure you're running the Node.js server (`npm start`)
- Check browser console for errors
- Ensure all form fields are filled

### Server won't start?
- Check if port 8000 is already in use
- Try a different port by modifying `server.js`
- Ensure Node.js is installed
- Run `npm install` to install dependencies

## Development

### Adding New Device Types

1. **Update `deviceConfig`** in `add-device.html`
2. **Add device controls** in `getDeviceSpecificSettings()`
3. **Update device rendering** in `index.html`

### Modifying Device Controls

1. **Edit `getDeviceControlsHTML()`** in `index.html`
2. **Update event handlers** in `handleDeviceInteraction()`
3. **Test with different device types**

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests! 