# IOT Platform

A modern IoT monitoring and management platform built with React, TypeScript, and Express.

## Features

- Real-time IoT device monitoring
- Interactive dashboard with device metrics
- Alert management system
- Responsive design with TailwindCSS
- Full TypeScript support

## Tech Stack

- **Frontend**: React 18 + React Router 6 + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express.js / Serverless Functions
- **UI**: Radix UI + TailwindCSS 3 + Lucide React icons
- **Testing**: Vitest

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Building for Production

```bash
# Build the application
npm run build:client

# The built files will be in dist/spa/
```

## Deployment

### Vercel (Recommended)

This project is configured for easy deployment on Vercel:

1. Import your repository to Vercel
2. Vercel will auto-detect the configuration from `vercel.json`
3. Deploy automatically on every push to main

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md).

### Other Platforms

The project can also be deployed on:
- Netlify (original configuration available)
- Docker (Dockerfile included)
- Any Node.js hosting platform

## API Endpoints

- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint
- `GET /api/machines` - Get machine data

## Project Structure

```
├── client/           # React frontend
│   ├── pages/        # Route components
│   ├── components/   # UI components
│   └── lib/          # Utilities
├── api/             # Serverless API functions (Vercel)
├── server/          # Express server (for local dev)
├── shared/          # Shared types
└── dist/            # Build output
    └── spa/         # Built frontend assets
```

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build both client and server
npm run build:client  # Build only client (for deployment)
npm test          # Run tests
npm run typecheck # TypeScript validation
```

## Environment Variables

No environment variables are required for basic functionality. Add any custom configuration as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is private and proprietary.