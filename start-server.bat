@echo off
echo Starting IoT Device Hub Server...
echo.
echo If this is your first time running the server, dependencies will be installed automatically.
echo.

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting server...
echo.
echo The IoT Device Hub will be available at: http://localhost:8000
echo Add Device page: http://localhost:8000/add-device
echo.
echo Press Ctrl+C to stop the server
echo.

npm start

pause 