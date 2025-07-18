## Equalize the Language Learning Playing Field.

## Table of Contents
- [Overview](#overview)
- [Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Overview
**Equalizer** is a web application made to provide detailed feedback for your English pronunciation.
Record a clip of any length, of any content-during an interview, in a presentation, or just have it open throughout the day-and receive professional feedback to quickly improve your pronunciation. Find out exactly what you need to work on and receive actionable next steps for your speech.

## Key Features
### In-Depth Analysis of Speech
- Provides a score from 0-100 and detailed steps for improvement for Phoneme Accuracy, Fluency, Intonation, and Connections.
### Quick Feedback
- Equalizer can provide results within 10 seconds, ensuring instant progress.
### Flexible and Accessible
- Available for use at any time, in any place, making it much more flexible than sessions with language coaches.

## Tech Stack
### Backend:
- Python
- FastAPI
- google-genai

### Frontend:
- React

## Getting Started
### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. (Recommended) Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   python main.py
   ```
### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
