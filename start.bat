@echo off
title CampusFix AI Server
cd /d "%~dp0"
echo Starting CampusFix AI Local Server...
powershell -ExecutionPolicy Bypass -File "%~dp0start-server.ps1"
pause
