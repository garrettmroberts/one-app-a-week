# PocketTutor 🎓

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-green)](https://openai.com/)

> An AI-powered learning platform that generates personalized course syllabi and delivers interactive audio lessons for hands-free learning.

![TutorOnTheGo Screenshot](public/screenshot.png)

## 🌟 Features

- **AI-Generated Syllabi**: Create comprehensive learning paths for any subject using GPT-4o
- **Interactive Audio Lessons**: Stream real-time lessons with browser-based text-to-speech
- **Progressive Learning**: Structured topic breakdown with subtopics for systematic learning
- **Session Persistence**: Local storage maintains your progress across sessions
- **Audio Controls**: Play, pause, resume, and stop functionality for optimal learning experience
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## 🚀 Live Demo

**[Try PocketTutor Now](https://pocket-tutor.garrettroberts.dev)**

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI Integration**: OpenAI GPT-4o API
- **Audio**: Web Speech Synthesis API
- **Deployment**: Vercel

## 📖 How It Works

1. **Subject Input**: Enter any topic you want to learn about
2. **Syllabus Generation**: AI creates a structured learning path with topics and subtopics
3. **Lesson Selection**: Choose specific subtopics to dive deeper
4. **Audio Learning**: Listen to AI-generated lessons with full audio controls
5. **Progress Tracking**: Your learning journey is automatically saved locally

## 🎯 Use Cases

Perfect for learning during:
- 🚗 Commuting
- 🏃‍♂️ Exercise sessions
- 🧹 Household chores
- 📱 Any hands-free activity

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tutor-on-the-go.git
   cd tutor-on-the-go
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── openai/
│   │       ├── route.ts          # Main OpenAI API endpoint
│   │       └── lesson/
│   │           └── route.ts      # Streaming lesson endpoint
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Main application component
│   └── globals.css              # Global styles
├── public/                      # Static assets
└── ...
```

## 🔧 API Endpoints

- `POST /api/openai` - Generate course syllabi
- `GET /api/openai/lesson` - Stream real-time lessons

## 🎨 Key Features Explained

### AI-Powered Syllabus Generation
The application uses GPT-4o to analyze your learning subject and create a comprehensive syllabus with main topics and subtopics, ensuring a structured learning approach.

### Real-Time Lesson Streaming
Lessons are generated and streamed in real-time using Server-Sent Events (SSE), providing an engaging learning experience without waiting for complete generation.

### Audio Learning Integration
Built-in browser speech synthesis allows for hands-free learning, perfect for multitasking scenarios.

## 🔮 Future Enhancements

- [ ] Enhanced text formatting and styling
- [ ] Client context retention between API calls
- [ ] Customizable lesson parameters (tone, difficulty, length)
- [ ] Interactive Q&A sessions with microphone support
- [ ] Fine-tuned syllabus customization via chat
- [ ] Comprehensive testing suite
- [ ] Advanced audio controls and voice selection

## 🤝 Contributing

This project is part of a personal challenge to build one hackathon-styled project per week. While it's currently an MVP, contributions and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Garrett Roberts**
- Website: [garrettroberts.dev](https://garrettroberts.dev)
- Project: [TutorOnTheGo](https://pocket-tutor.garrettroberts.dev)

---

⭐ **Star this repository if you find it helpful!**
