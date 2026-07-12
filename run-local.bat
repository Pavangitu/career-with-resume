@echo off
echo ===================================================
echo Starting CareerWith Local Development Server
echo ===================================================

:: Check if node_modules folder exists
if not exist "node_modules\" (
    echo node_modules not found. Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed. Please ensure Node.js is installed and path is set correctly.
        pause
        exit /b %errorlevel%
    )
)

echo Starting development server...
npm run dev
if %errorlevel% neq 0 (
    echo [ERROR] Failed to start development server.
    pause
    exit /b %errorlevel%
)
pause
