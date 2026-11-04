@echo off
setlocal
cd /d "%~dp0"
echo ========================================================
echo   Syncing Local SEO Client Audits to GitHub
echo   Repository: https://github.com/icosalman/bright-local-loom-video
echo ========================================================
echo.

git add .
git commit -m "Auto-sync client audits and loom scripts: %date% %time%"
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo   SUCCESS! All client audit data is now live on GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   Notice: GitHub needs authentication.
    echo   Run: gh auth login  (takes 10 seconds via browser)
    echo   Or: git remote set-url origin https://<TOKEN>@github.com/icosalman/bright-local-loom-video.git
    echo ========================================================
)
echo.
pause
