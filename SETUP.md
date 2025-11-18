# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Gemini AI

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create `.env.local` in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## 3. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 4. Test AI Integration

1. Go to the home page
2. Click on any feature card (e.g., "Dynamic Roadmaps")
3. Fill in the form
4. Click "Generate AI Response"
5. The AI should respond using Gemini

## 🎉 You're All Set!

All pages are available:
- `/` - Home
- `/business-strategy` - Business Strategy
- `/market-analysis` - Market Analysis  
- `/investor-deck` - Investor Resources
- `/technical-architecture` - Tech Architecture

## Troubleshooting

**AI not working?**
- Check that `GEMINI_API_KEY` is set in `.env.local`
- Restart the dev server after adding the key
- Check browser console for errors

**Styling issues?**
- Make sure Tailwind CSS is properly configured
- Clear `.next` cache: `rm -rf .next`

**Build errors?**
- Run `npm install` again
- Check Node.js version (needs 20.9.0+)

