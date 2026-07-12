@echo off
echo.
echo ====================================================
echo 🚀 Preparing to Push Project to GitHub
echo ====================================================
echo.

:: Initialize git if not already initialized
if not exist .git (
    echo [1/5] Initializing Git repository...
    git init
) else (
    echo [1/5] Git repository already initialized.
)

:: Add remote origin (remove if exists first to avoid conflict)
echo [2/5] Setting remote origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/Pavangitu/career-with-resume.git

:: Add all files
echo [3/5] Staging files...
git add .

:: Commit files
echo [4/5] Committing changes...
git commit -m "Initial commit: Enriched domains, A4 print scaling, CodeRabbit and AI fallback engine"

:: Set branch and push
echo [5/5] Pushing to GitHub (main branch)...
git branch -M main
git push -u origin main

echo.
echo ====================================================
echo 🎉 Process finished! Check your GitHub repository.
echo ====================================================
pause
