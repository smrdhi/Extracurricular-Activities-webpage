@echo off
REM This script will automate moving frontend files to 'public' folder and start the backend server

REM Create public directory if it doesn't exist
if not exist public (
    mkdir public
)

REM Move frontend files to public folder
move /Y index19.html public\
move /Y styles12.css public\
move /Y scripts15.js public\

REM Install dependencies
npm install

REM Start the backend server
npm start