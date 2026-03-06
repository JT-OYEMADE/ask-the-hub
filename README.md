# Ask The Hub

*Your free, AI-powered research intelligence tool — built with Next.js and Claude AI.*

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript) ![Claude AI](https://img.shields.io/badge/Powered%20by-Claude%20AI-d4ff5c?style=flat-square) ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square) ![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)

---

## About

Ask The Hub is a free AI research tool that turns any topic into a structured, expert-level report in seconds. Whether you're researching agriculture in a Nigerian state, exploring the fintech landscape, hunting for scholarships, or analysing a startup ecosystem — Ask The Hub gives you everything in one place.

No paywalls. No sign-up. Just ask.

---

## Features

- 🔍 **Deep Research** — Get structured reports covering overview, statistics, insights, trends, challenges, and actionable steps
- 🎚️ **Depth Control** — Choose between Summary, Detailed, or Expert mode depending on how deep you want to go
- 📋 **Copy Results** — Copy the full research output to your clipboard instantly
- ⭐ **Bookmarks** — Star and save your favourite searches for quick access later
- 🕐 **Search History** — Every search is saved locally so you can revisit past results without re-querying
- 📥 **Download as PDF** — Export any research result as a clean, formatted PDF
- ⚡ **Instant Re-load** — Click any past search in your history to reload results instantly — no extra API call
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| AI Model | Anthropic Claude (claude-sonnet-4-20250514) |
| Fonts | Syne + DM Sans (Google Fonts) |
| Icons | Lucide React |
| PDF Export | jsPDF + html2canvas |
| Storage | localStorage (client-side persistence) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/ask-the-hub.git
   cd ask-the-hub
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root of the project:

   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000)

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com | ✅ Yes |

> ⚠️ Never commit your `.env.local` file. It is already excluded in `.gitignore`.

---

## Project Structure

```
ask-the-hub/
├── app/
│   ├── api/
│   │   └── research/
│   │       └── route.ts        # API route — calls Anthropic
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Main page and state management
│   ├── globals.css             # Global styles and CSS variables
│   └── icon.svg                # Favicon
├── components/
│   ├── sections/               # Individual result section components
│   ├── BackgroundEffects.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── SearchPanel.tsx
│   ├── ExampleChips.tsx
│   ├── LoadingState.tsx
│   ├── ResultDrawer.tsx        # Bottom drawer for results
│   └── HistoryPanel.tsx        # Left-side history panel
├── lib/
│   ├── history.ts              # localStorage helpers
│   ├── download.ts             # PDF export logic
│   └── time.ts                 # timeAgo formatter
├── types/
│   └── research.ts             # TypeScript interfaces
└── public/
```

---

## How It Works

1. User types a research topic (or selects an example)
2. The frontend sends the query and depth preference to `/api/research`
3. The API route calls Anthropic's Claude model with a structured system prompt
4. Claude returns a JSON object with 7 research sections
5. The result slides up in a bottom drawer
6. The entry is saved to localStorage for future access

---

## Usage Examples

Here are some things you can ask Ask The Hub:

- *"Agriculture in Ogun State Nigeria — market outlook and opportunities"*
- *"State of fintech in Africa 2025"*
- *"Scholarships for Nigerian students studying abroad"*
- *"Startup ecosystem in Lagos — funding trends and key players"*
- *"Climate change impact on food security in West Africa"*
- *"How to break into product management with no experience"*

---

## Deployment

The easiest way to deploy Ask The Hub is with [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository on vercel.com
3. Add your `ANTHROPIC_API_KEY` in the Environment Variables section
4. Deploy

Your app will be live at `https://your-project.vercel.app`

---

## API Cost

Ask The Hub uses Anthropic's Claude API. Each research query costs approximately $0.01 – $0.03 depending on response length. A $5 credit deposit gives you roughly 200–400 queries.

Search history is stored locally — revisiting a past result costs nothing.

---

## Contributing

Contributions, issues, and feature requests are welcome.
Feel free to open an issue or submit a pull request.

---

## Author

Built by [Oluwatomisin](https://j-to.vercel.app/)

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## License

This project is licensed under the MIT License.
