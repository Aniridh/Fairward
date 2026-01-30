# Fairward - AI Healthcare Auditor

This is the codebase for **Fairward**, an AI-powered tool that helps patients audit their medical bills, detect overcharges, and generate dispute letters.

## 🚀 Features

*   **Instant Audit**: Upload a bill (PDF/Image) and get results in seconds.
*   **Price Comparison**: Benchmarks charges against Medicare and commercial rates.
*   **Auto-Dispute**: Generates a legally-sound dispute letter.
*   **Demo Mode**: Built-in mock scenarios (MRI, Blood Work, ER) for pitch demonstrations.

## 🛠️ Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS
*   **AI**: OpenAI GPT-4o (Vision & Text Analysis)
*   **PDF Parsing**: `pdf-parse`

## 📦 Deployment to Vercel

This project is ready to deploy on Vercel.

### Option 1: One-Click Deploy
Click the button below to deploy this project. Vercel will automatically detect the `web` folder.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Aniridh/JustCare/tree/main/web)

### Option 2: Manual Import
1.  Push this code to your GitHub repository.
2.  Go to [Vercel](https://vercel.com) and click **"Add New..."** -> **"Project"**.
3.  Import your repository (`JustCare`).
4.  **Important**: In the "Configure Project" screen, look for **"Root Directory"**.
    *   Click "Edit" and select `web`.
5.  Add your Environment Variables:
    *   `OPENAI_API_KEY`: Your OpenAI API Key (required for real analysis).
6.  Click **Deploy**.

## 🏃‍♂️ Running Locally

1.  Navigate to the web directory:
    ```bash
    cd web
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    *   Create `.env.local`
    *   Add `OPENAI_API_KEY=sk-...`
4.  Run the dev server:
    ```bash
    npm run dev
    ```
