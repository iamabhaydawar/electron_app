# Electron System Resource Monitor

A desktop application built with Electron, React, and TypeScript that monitors and displays system resource usage (CPU, RAM, and Storage) in real-time with interactive charts.

## Features

- Real-time system resource monitoring (CPU, RAM, Storage)
- Interactive charts using Recharts
- System tray integration
- Cross-platform support (macOS, Windows, Linux)
- Hot module replacement during development

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

You can verify your installation by running:

```bash
node --version
npm --version
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd electron_app
```

2. Install dependencies:

```bash
npm install
```

## Development

To start the development environment:

```bash
npm run dev
```

This command will:
- Start the React development server on `http://localhost:5173` with hot module replacement
- Transpile the Electron main process TypeScript code
- Launch the Electron application

The app will automatically reload when you make changes to the React UI. For Electron main process changes, you may need to restart the dev server.

### Development Scripts

You can also run the React and Electron processes separately:

```bash
# Start only the React dev server
npm run dev:react

# Start only Electron (after transpiling)
npm run dev:electron
```

## Building for Production

To build the application for production:

```bash
npm run build
```

This will:
1. Transpile the Electron TypeScript code
2. Compile the React TypeScript code
3. Build the React application using Vite

The output will be in:
- `dist-electron/` - Compiled Electron main process
- `dist-react/` - Built React application

## Creating Distributables

To create platform-specific distributable packages:

### macOS (ARM64)

```bash
npm run dist:mac
```

Creates a `.dmg` file for macOS on ARM64 architecture.

### Windows (x64)

```bash
npm run dist:win
```

Creates both portable and MSI installers for Windows x64.

### Linux (x64)

```bash
npm run dist:linux
```

Creates an AppImage for Linux x64.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development mode (runs React dev server and Electron in parallel) |
| `npm run dev:react` | Start only the React development server |
| `npm run dev:electron` | Transpile Electron code and start Electron |
| `npm run build` | Build the application for production |
| `npm run transpile:electron` | Transpile Electron TypeScript to JavaScript |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview the production build locally |
| `npm run dist:mac` | Build distributable for macOS (ARM64) |
| `npm run dist:win` | Build distributable for Windows (x64) |
| `npm run dist:linux` | Build distributable for Linux (x64) |

## Project Structure

```
electron_app/
├── src/
│   ├── electron/          # Electron main process code
│   │   ├── main.ts        # Main entry point
│   │   ├── menu.ts        # Application menu
│   │   ├── tray.ts        # System tray implementation
│   │   ├── pathResolver.ts # Path resolution utilities
│   │   ├── resourceManager.ts # System resource polling
│   │   └── util.ts        # Utility functions
│   └── ui/                # React UI components
│       ├── App.tsx        # Main React component
│       ├── Chart.tsx      # Chart component
│       ├── BaseChart.tsx  # Base chart implementation
│       └── useStatistics.ts # Statistics hook
├── dist-electron/         # Compiled Electron code (generated)
├── dist-react/            # Built React application (generated)
├── electron-builder.json  # Electron Builder configuration
├── vite.config.ts         # Vite configuration
├── package.json           # Project dependencies and scripts
└── README.md             # This file
```

## Technologies Used

- **Electron** ^37.4.0 - Cross-platform desktop application framework
- **React** ^19.1.1 - UI library
- **TypeScript** ~5.8.3 - Type-safe JavaScript
- **Vite** ^7.1.2 - Fast build tool and dev server
- **Recharts** ^3.1.2 - Charting library for React
- **Electron Builder** ^26.0.12 - Application packaging and distribution
- **os-utils** ^0.0.14 - Operating system utilities

## Troubleshooting

### Port 5173 already in use

If you encounter an error that port 5173 is already in use, you can either:
- Stop the process using that port
- Modify the port in `vite.config.ts`

### Electron window doesn't open

Make sure both the React dev server and Electron are running. Check the terminal for any error messages.

### Build errors

If you encounter build errors:
1. Make sure all dependencies are installed: `npm install`
2. Clear the build directories: `rm -rf dist-electron dist-react`
3. Try building again: `npm run build`

## License

This project is private and not licensed for public use.
