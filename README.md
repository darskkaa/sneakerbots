# Adil_SneakerBot

A powerful cross-platform automation tool for purchasing limited-edition sneakers from Nike, SNKRS, Shopify, and Footsites.

![Version](https://img.shields.io/badge/version-0.9.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS-lightgrey.svg)

## Features

- 🚀 Fast and reliable Nike.com and SNKRS automation
- 🔄 Proxy rotation with health checking
- 🔐 Secure AES-256-GCM encrypted profile vault
- 🧠 CAPTCHA solving integration (manual, 2Captcha, CapMonster, AYCD)
- 📊 Real-time task monitoring and statistics
- 🧙‍♂️ User-friendly wizard for task creation
- 📱 Supports webhook notifications (Discord, Slack)

## Requirements

- Node.js 20.x or later
- npm 10.x or later
- Windows 10/11 or macOS 12+

## Installation

### Development Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/sneakerbot.git
cd sneakerbot
```

2. Install dependencies:

```bash
npm install
cd client
npm install
cd ..
```

3. Run in development mode:

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run package
```

Packaged applications will be created in the `dist` directory.

## Usage

### Getting Started

1. Launch the application
2. Create profiles with your shipping and payment information
3. Add proxies to improve success rates and avoid IP bans
4. Create a task for the product you want to purchase
5. Start the task and monitor progress

### Task Creation

1. Navigate to the Tasks tab
2. Click "New Task"
3. Enter product URL or SKU, desired size, and quantity
4. Select a profile and proxy group
5. Configure advanced settings if needed
6. Create the task

### Proxy Setup

- Supports HTTP, HTTPS, SOCKS4, and SOCKS5 proxies
- Format: `ip:port` or `ip:port:username:password`
- Group proxies for better organization and task distribution
- Test proxies against Nike servers to verify they're working

### Profile Management

- Create multiple shipping and payment profiles
- All payment data is encrypted locally
- Supports different countries and regions

## Architecture

- **Frontend:** Electron + React 18 + TailwindCSS (Vite-powered)
- **Backend as a Service:** Supabase (PostgreSQL database, Auth, API, Storage)
- **API:** Supabase client SDK for all database and authentication operations
- **Encryption:** AES-256-GCM for local sensitive data

> SneakerBot now uses Supabase for all persistent storage, user authentication, and real-time data sync. No local SQLite or Playwright automation is used in this version.

## Developer Documentation

### Project Structure

```
sneakerbot/
├── electron/         # Electron main process code
├── src/              # Core bot functionality and business logic
├── client/           # React frontend application
├── dist/             # Compiled code output
└── resources/        # Application resources
```

### Building Modules

To create a new module:

1. Add a new directory under `src/modules/`
2. Implement the module interface
3. Register the module in `src/modules/index.ts`

## Legal Disclaimer

This software is provided for educational purposes only. Using custom checkout bots may violate retailers' Terms of Service and local laws. Users are responsible for ensuring their usage is ethical and legal.

## Support

For issues, feature requests, or questions, please [open an issue](https://github.com/your-username/sneakerbot/issues).

## License

This is a personal project-simply for personal use and learning material!
