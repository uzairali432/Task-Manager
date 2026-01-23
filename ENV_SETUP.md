# Environment Setup Guide

## Gemini API Configuration

This task management app uses Google Gemini AI for intelligent task suggestions, priority recommendations, and productivity insights.

### Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click on "Create API Key"
3. Copy your API key

### Step 2: Add to Environment File

Open or create the `.env.local` file in your project root and add:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with the API key you copied in Step 1.

### Step 3: Restart Your Application

After adding the environment variable, restart your development server:

```bash
npm run dev
```

### Step 4: Verify Setup

- The AI Assistant page should now be fully functional
- The key icon in the navbar will show green status when the API is connected
- You can now use all AI features without any setup modal

## Important Notes

- **NEXT_PUBLIC_** prefix: This allows the variable to be used on the client side (required for browser-based AI calls)
- **Do not commit** `.env.local` to version control
- Keep your API key private and secure
- If you accidentally expose your key, delete it from Google AI Studio and create a new one

## Troubleshooting

If the AI features aren't working:

1. Verify `.env.local` file exists in the project root
2. Check that `NEXT_PUBLIC_GEMINI_API_KEY` is correctly set
3. Ensure the API key is valid and active in Google AI Studio
4. Restart the development server after making changes
5. Check browser console for any error messages
