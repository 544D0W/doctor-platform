# LifeLink: AI-Powered Medical Emergency Response System 🚑
## Overview 🌟
LifeLink is an Medical Emergency Response System powered by Agentic AI, designed to bridge the gap between paramedics and hospitals, enabling faster, smarter, and more efficient emergency care. By integrating real-time patient data collection, AI-assisted diagnostics, and an intelligent hospital dashboard, we are revolutionizing the way medical teams respond to emergencies.

To better understand the system workflow, check out our [detailed flowchart](https://lucid.app/lucidspark/0f9df9e2-9f57-42ea-859a-d3aa5d117b8e/edit?viewport_loc=-17450%2C-3825%2C43000%2C16550%2C0_0&invitationId=inv_a9b4f0e2-a760-4fcb-964c-6ec48d70a292) that explains the entire process.

## Features ✨
- **Real-time Emergency Tracking** 📍
  - Live monitoring of incoming emergency requests
  - Dynamic status updates
  - Geolocation integration
- **AI-Assisted Diagnostics** 🧠
  - Intelligent symptom analysis
  - Automated preliminary assessments
  - Real-time medical recommendations
- **Smart Hospital Dashboard** 💻
  - Intuitive user interface
  - Real-time notifications system
  - Comprehensive patient information display
- **Automated Doctor Assignment** 👨‍⚕️
  - Intelligent matching based on specialization
  - Real-time availability tracking
  - Instant notification system
## Tech Stack 🛠️
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: SambaNova AI API
- **Real-time Communications**: Socket.IO
- **UI Components**: Lucide Icons, Framer Motion
- **State Management**: React Context
## Prerequisites 📋
Before running the project, ensure you have:
- Node.js (v16.0 or higher)
- npm or yarn
- A SambaNova API key
## Installation 🚀
1. Clone the repository:
```bash
git clone https://github.com/544D0W/doctor-platform
cd doctor-platform
npm install
```
2.Set up environment variables:
```bash
inside the  Directory
echo "SAMBANOVA_API_KEY=your_api_key"  > .evn
```
Running the Project 🏃‍♂️
1.Start the development server:
```bash
npm run dev
# or
yarn dev
```
2.Open your browser and navigate to:
```bash
http://localhost:3000
```
Project Structure 📁
```bash
lifelink/
├── app/                 # Next.js app directory
├── components/          # React components
├── context/            # React context providers
├── lib/                # Utility functions
├── public/             # Static assets
├── services/           # API services
└── types/              # TypeScript types
```
