# Construction Company Lead Capture Chatbot (Phase 1 Build)

An AI-powered, high-performance lead capture chatbot widget built for construction and remodeling company websites. The assistant ("Alex") qualification-checks visitors, extracts structured lead details using Claude 3.5, and triggers backend notifications in parallel (Google Sheets + Gmail notification).

---

## Technical Stack
- **Framework**: Next.js 14/15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Lead Storage**: Google Sheets API v4
- **Email Notifications**: Nodemailer + Gmail SMTP
- **Deployment**: Vercel

---

## Google Sheets Configuration (First-Time Setup)

The chatbot automatically verifies and initializes your sheet header if it is blank. However, you must perform these steps to link it:

1. **Create your Google Sheet**:
   Create a new Google Sheet. You will need its unique ID from the URL:
   `https://docs.google.com/spreadsheets/d/[GOOGLE_SHEET_ID]/edit`

2. **Column Headers Schema (Row 1)**:
   The chatbot appends leads with these columns in exact order:
   ```
   Timestamp | Name | Phone | Email | Project Type | Project Description | Budget Range | Timeline | Location | Best Time to Call | Conversation Summary | Source
   ```

3. **Share Google Sheet with Service Account**:
   Open the Share settings on your Google Sheet and invite your service account email (e.g., `chatbot-service-account@your-project.iam.gserviceaccount.com`) as an **Editor**.

---

## Credentials Setup Guide

### 1. Anthropic Claude API Key
- Go to the [Anthropic Console](https://console.anthropic.com/).
- Create an account or log in.
- Navigate to **API Keys** and generate a new key (`sk-ant-...`).

### 2. Google Sheets API Credentials
- Create a project on the [Google Cloud Console](https://console.cloud.google.com/).
- Search for and enable the **Google Sheets API**.
- Navigate to **IAM & Admin > Service Accounts** and click **Create Service Account**.
- Create a JSON credential key for the service account and download it.
- **Base64 Encode the JSON Key**:
  To put this in `.env.local` or Vercel, you need to base64 encode the downloaded JSON file content:
  - **Windows (PowerShell)**:
    ```powershell
    [Convert]::ToBase64String([System.IO.File]::ReadAllBytes("path-to-your-service-account-key.json"))
    ```
  - **Mac/Linux (Terminal)**:
    ```bash
    base64 -i path-to-your-service-account-key.json
    ```
  Copy the resulting base64 output into the `GOOGLE_SERVICE_ACCOUNT_JSON` variable.

### 3. Gmail SMTP App Password
- Log into the sender Gmail account.
- Go to **Google Account Settings > Security**.
- Ensure **2-Step Verification** is turned ON.
- Search for **App Passwords** in the search bar.
- Create a new App Password (name it e.g. "Chatbot Notification"), copy the generated 16-character code, and put it in `EMAIL_PASSWORD`.

---

## Environment Variables (`.env.local`)

Create a `.env.local` file in your project root with the following keys:

```env
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-xxx...

# Google Sheets
GOOGLE_SERVICE_ACCOUNT_JSON=ey...[base64-encoded-creds]
GOOGLE_SHEET_ID=1xX_your_google_sheet_id_here

# Email notifications
EMAIL_FROM=sender_gmail@gmail.com
EMAIL_TO=owner_receiver@gmail.com
EMAIL_PASSWORD=xxxx                  # 16-character Gmail App Password

# Company configuration details used in the AI prompt
COMPANY_NAME="BuildRight Construction"
COMPANY_PHONE="+44 20 7946 0958"
COMPANY_EMAIL="contact@buildright.co.uk"
COMPANY_SERVICE_AREA="London and surrounding home counties"
OWNER_FIRST_NAME="Marcus"
```

---

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser. Click **Start Your Project** or click the chat bubble in the bottom-right corner to initiate conversation.

---

## Vercel Production Deployment

To deploy this project to Vercel (free tier):

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Deploy and configure env vars**:
   Run `vercel` from the root directory:
   ```bash
   vercel
   ```
   Follow the CLI prompts to set up the project. Once configured, you can set all your `.env.local` variables in your **Vercel Dashboard > Project Settings > Environment Variables** tab.
3. **Trigger Production Build**:
   ```bash
   vercel --prod
   ```
   This will deploy the chatbot with the maximum serverless execution timeouts defined in `vercel.json`.

---

## Phase 2 Roadmap (Future Scope)

Phase 2 will include the following enterprise enhancements:
1. **Universal Embed Script**: A lightweight script tag to load the widget on Squarespace, WordPress, Wix, and Webflow without Next.js.
2. **CRM Integration**: Instant forwarding of parsed leads to Salesforce, HubSpot, or GoHighLevel.
3. **Instant Notifications**: Automated SMS/WhatsApp notifications to the owner via Twilio when leads complete.
4. **Database Retention**: Storing conversation records in Firestore or Supabase.
5. **Dashboard Analytics**: Admin console for viewing, searching, and exporting captured leads.
6. **Dynamic A/B Testing**: Support for testing different greeting lines and personality profiles.
