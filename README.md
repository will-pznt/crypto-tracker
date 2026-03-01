# Cryptocurrency Price Tracker

## Project Overview
A responsive, mobile-first Angular application that tracks real-time cryptocurrency prices. Users can browse the top cryptocurrencies, search for specific assets, and curate a personalized dashboard of favorites. 

### Key Features & Architectural Decisions
- **Modern State Management:** Implemented using the latest NgRx standards (`createFeature`, `createActionGroup`) to strictly eliminate boilerplate while maintaining robust, synchronous Redux state patterns.
- **Mobile-First UI (Tailwind CSS):** Features a complex, fully responsive data table utilizing a "Sticky Super-Column" approach. This ensures vital information (Logo, Name, Price, Remove button) remains visible while horizontally scrolling through rich market data on smaller screens.
- **Performance Optimized (API Limits):** Adhering to the "avoid over-engineering" directive and respecting CoinGecko's Free Tier rate limits, the app performs a single fetch of the top 100 coins. Search and pagination are cleanly handled client-side to provide a lightning-fast UX without triggering `429 Too Many Requests` API errors.
- **Local Storage Persistence:** NgRx automatically syncs favorite selections with the browser's `localStorage` so the user's dashboard survives page refreshes.
- **Automated Testing:** Unit tests are configured using **Vitest** for blazing-fast execution.
- **CI/CD Ready:** Includes a GitHub Actions pipeline (`ci.yml`) to automatically run the test suite on every push.

## Tech Stack
- **Framework:** Angular 21 (Standalone Components)
- **State Management:** NgRx Store & Effects
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest & Angular TestBed
- **API:** CoinGecko API (Free Tier)

---

## 🛠 Prerequisites

Before running this project, ensure you have the following installed on your machine:
- **Node.js** (v18 or v20 LTS recommended)
- **npm** (v9 or higher)

---

## 🚀 Setup & Installation

**1. Clone the repository**

git clone <YOUR_GITHUB_REPO_URL>
cd crypto-tracker

**2. Install dependencies**

npm install

**2. Configure the Environment Variables**

This application uses the CoinGecko API, which requires a Demo API Key.

Create the environments folder and files if they do not exist:

mkdir -p src/environments
touch src/environments/environment.ts
touch src/environments/environment.development.ts

Open src/environments/environment.development.ts (and environment.ts if building for production) and add your API key:

export const environment = {
  production: false,
  x_cg_demo_api_key: 'YOUR_COINGECKO_API_KEY_HERE' 
};

## 💻 Running the Application

To start the local development server, run:

npm start


Or use the standard Angular CLI: ng serve

Once compiled, navigate your browser to: http://localhost:4200/

## 🧪 Running Automated Tests

This project uses Vitest for high-performance unit testing, mocking the NgRx store to test components in isolation.

To execute the test suite, run:

npm run test