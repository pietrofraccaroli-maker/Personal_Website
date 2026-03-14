@echo off
setlocal
cd /d "%~dp0"

set "REMOTE_URL=https://github.com/pietrofraccaroli-maker/Personal_Website.git"

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  git init
  git branch -M main
)

git remote get-url origin >nul 2>&1
if errorlevel 1 (
  git remote add origin %REMOTE_URL%
) else (
  git remote set-url origin %REMOTE_URL%
)

git add .
git diff --cached --quiet
if not errorlevel 1 (
  echo No changes to deploy.
  goto :eof
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm-ss"') do set "TS=%%i"
git commit -m "site update %TS%"
git push -u origin main

if errorlevel 1 (
  echo.
  echo Push failed. If prompted, authenticate GitHub in your browser and run deploy.bat again.
  exit /b 1
)

echo.
echo Deploy completed successfully.
