# What If GPT - Alternative Universe Simulator

A modern web application that generates creative "What If" scenarios using AI-powered technology. Explore fascinating alternative realities across different categories like history, technology, society, environment, and economics.

![Resim3](https://github.com/user-attachments/assets/53281632-37f2-4274-ac46-e4caf4478e86)


## Features

- **AI-Powered Scenario Generation**: Create detailed alternative universe scenarios based on your "What if" questions
- **Multi-Category Support**: Explore scenarios across 5 different categories
- **Interactive Web Interface**: Modern, responsive design with smooth animations
- **Scenario Management**: Save, view, and manage your created scenarios
- **Search & Filter**: Find scenarios by keywords and categories
- **Turkish Language Support**: Fully localized interface

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Wouter (routing)
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI GPT-4 (optional)
- **UI Components**: Radix UI, shadcn/ui
- **Build Tools**: Vite, ESBuild

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key (optional, for AI-powered scenarios)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd what-if-gpt
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key (optional)
```

4. Initialize the database
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/scenarios` - Fetch all scenarios
- `GET /api/scenarios/:id` - Get specific scenario
- `POST /api/scenarios/generate` - Generate new scenario
- `POST /api/scenarios/:id/like` - Like a scenario

## Project Structure

```
├── client/          # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages
│   │   └── lib/         # Utilities and configurations
├── server/          # Backend Express application
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Database operations
│   └── openai.ts    # AI integration
├── shared/          # Shared types and schemas
└── package.json
```

## Categories

- **Historical**: Alternative historical events and their consequences
- **Technological**: Futuristic and technological what-if scenarios
- **Social**: Society and human behavior alternatives
- **Environmental**: Climate and environmental changes
- **Economic**: Economic systems and financial alternatives

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please create an issue in the repository.
