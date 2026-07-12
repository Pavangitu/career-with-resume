# 🚀 CareerWith - Real-Time AI Resume Builder

An advanced, responsive, AI-powered resume builder built with modern design principles (neomorphism + liquid glass aesthetics). Create polished, recruiter-optimized resumes tailored to your career domain instantly.

👉 **View App Repository**: [https://github.com/Pavangitu/career-with-resume](https://github.com/Pavangitu/career-with-resume)

---

## ✨ Features

### 🎨 1. 15 Bespoke Visual Styles
* Supports 15 professional templates including:
  * **Tech Elegant** & **Modern Minimal** (for Developers/Engineers)
  * **Bold Brutalist** (high-impact stark contrast)
  * **Emerald Clean** (tailored for Healthcare and Medical staff)
  * **Midnight Premium** & **Future AI CLI** (advanced dark mode themes)
  * **Structured Outline** & **Editorial Serif** (classic print layouts)

### 📄 2. Strict A4 Single-Page fitting
* Automatically scales the preview container (`scale(S)`) dynamically if contents exceed the A4 boundary (`1040px`).
* Ensures zero overflow, keeping PDF exports and prints looking perfect on **exactly one page** of A4 paper.

### 🤖 3. Built-In Gemini AI Copilot (with Offline Fallbacks)
* **AI Summary Generator**: Drafts punchy, recruiter-optimized professional summaries.
* **STAR-Method Bullet Optimizer**: Converts simple task descriptions into quantifiable metrics-driven achievements.
* **ATS Recruiter Scanner**: Scans keywords and gives alignment scores (0-100) with detailed optimization tips.
* **AI Cover Letter Writer & Enhancer**: Instantly creates and refines cover letters.
* **🔌 Offline Resiliency**: Seamlessly switches to a local rule-based mock engine if the Gemini API key is missing or invalid so the app never throws errors.

### 🐇 4. CodeRabbit AI Workspace Widget
* Features a diagnostic widget to audit JSON schema formats, automatically correcting trailing commas, missing categories, and unquoted fields on copy-paste.

---

## 🛠️ Run Locally

### **Prerequisites:**
* Node.js (v18 or higher recommended)
* npm (Node Package Manager)

### **Installation & Startup:**

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure your API Key**:
   Create a `.env.local` file in the root directory (or use the existing one) and configure your Gemini API Key:
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```
   *(If left as the placeholder, the app will run in local fallback mode).*

3. **Start the development server**:
   ```bash
   .\run-local.bat
   ```
   Or run manually:
   ```bash
   npm run dev
   ```

4. Open **`http://localhost:3000`** in your browser.

---

## 📦 Pushing Code Updates

To commit changes and sync your repository, run:
```powershell
git add .
git commit -m "Update: Your description here"
git push
```
