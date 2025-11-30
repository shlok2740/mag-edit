# Mag Edit AI

A modern web application that transforms ordinary photos into stunning, professional magazine covers using AI-powered filters and layouts. Create high-quality magazine-style images in seconds with pre-trained styles from top fashion publications.

## Features

- **AI-Powered Generation**: Advanced algorithms analyze your images to apply professional magazine aesthetics
- **Curated Style Library**: Access styles inspired by Vogue, GQ, Elle, Vanity Fair, and more
- **Instant Results**: Generate high-resolution covers in under 5 seconds
- **Gallery Management**: Save, view, and download your creations with automatic cleanup
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Privacy-Focused**: Images are processed securely and deleted after generation

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **Icons**: React Icons
- **Build Tool**: Vite with React plugin
- **Styling**: TailwindCSS v4 with custom dark theme
- **Linting**: ESLint with React-specific rules

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API token for image generation service (see Setup below)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mag-edit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your API token:
   ```env
   VITE_API_TOKEN=your_api_token_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

1. **Upload Image**: Click the upload area or drag & drop a high-quality portrait photo
2. **Select Style**: Choose from available magazine presets (Vogue, GQ, Elle, etc.)
3. **Generate**: Click "Generate AI Style" to apply the filter
4. **Download**: Save your creation to device or view in gallery

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## API Integration

This application integrates with an external AI image generation API. You'll need to obtain an API token and configure it in your environment variables. The app uses the following endpoints:

- Image generation: `POST /generate`
- Status checking: `GET /status/{job_id}`

*Note* - Get your API token from [Bria AI](https://platform.bria.ai/)

## Project Structure

```
src/
├── api/
│   ├── generate-image.js    # API calls for image generation
│   └── status-service.js    # Status polling service
├── filters/                 # Magazine style configurations
│   ├── vogue.json
│   ├── gq.json
│   └── ...
├── assets/                  # Static assets
├── components/
│   ├── App.jsx             # Main app component
│   ├── Home.jsx            # Editor interface
│   └── LandingPage.jsx     # Landing page
└── index.css               # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

The generated images emulate the styles of various magazine publications. Please respect trademark laws and use the images responsibly for personal or commercial purposes as appropriate.
