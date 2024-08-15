@echo off

node ./src/js/art.js
powershell -ExecutionPolicy Bypass -File .\src\asfixy.ps1
