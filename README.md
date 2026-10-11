# 🌍 Travel Guide — Discover the World

    A web-based Travel Guide project that helps users explore travel information using a frontend and a Python Flask backend, with Murf.ai integration.

<p align="center">
  <strong>Your personal companion for exploring destinations with AI-powered travel assistance.</strong>
</p><p align="center">
  Explore destinations • Generate audio guides • Discover places
</p><p align="center">
  <img src="https://img.shields.io/badge/Project-Travel%20Guide-orange?style=for-the-badge&logo=googlemaps" alt="Travel Guide Project" />
  <img src="https://img.shields.io/badge/Status-In%20Development-blue?style=for-the-badge" alt="Project Status" />
</p>


## ✈️ About the Project

    Travel Guide is a web-based project designed to help users explore destinations and access travel information through an interactive interface.

    The project separates the frontend and backend, making it easier to maintain, develop, and deploy each part independently.

## 🧭 The Idea

    Travel is more than visiting a place — it's about discovering its history, culture, and unique experiences.
    Travel Guide brings destination information into one interactive web experience. Its frontend provides the interface, while the Python backend handles the application's server-side functionality.

## ✨ Features

    - 🌎 Destination Exploration — Explore travel destinations.
    - 🔎 Destination Search — Find destinations through the search interface, if implemented.
    - 🎧 Audio Travel Guides — Generate or listen to destination guides, if supported by your application.
    - 🗣️ Language Options — Access available language choices, if implemented.
    - 📱 Responsive Interface — Designed for a range of screen sizes, if supported.
    - 🔗 Frontend & Backend Integration — Connect the user interface to the Python backend.

«Keep only the features that are actually implemented in your project.»


## 🛠️ Tech Stack

    Part| Technologies
    Frontend| HTML, CSS, JavaScript
    Backend| Python, Flask
    API & AI Integration| Google Gen AI SDK, if used
    Cross-Origin Requests| Flask-CORS
    Environment Configuration| python-dotenv
    Version Control| Git & GitHub

## 📁 Project Structure

  ```
    Travel-Guide/
    ├── Backend/
    │   ├── app.py
    │   ├── requirement.txt
    |   # .env stays private and is not uploaded 
    ├── Frontend/
    │   ├── index.html
    │   └── index.js
    ├── .gitignore
    └── README.md
  ```

## 🌐 Live Demo

    - Frontend: https://travel-guide-frontend-delta.vercel.app/
    - Backend: https://travel-guide-using-murf-ai-0ozg.onrender.com

## 📦 Installation and Setup

    1. Clone the repository

    git clone https://github.com/kanithikalikowsik/Travel-Guide-using-Murf.ai.git

    2. Open the project

    cd Travel-Guide-using-Murf.ai

    3. Set up the backend

    cd Backend
    pip install -r requirements.txt
    python app.py

    4. Open the frontend

    Open "Frontend/index.html" in your browser or use the development server appropriate for your project.

## 🚀 Deployment

    The deployment setup is:

    - Frontend deployed using Vercel.
    - Backend deployed using Render.
    - Source Code: "GitHub"

    Deployment configuration and environment variables must be set separately for each service.

## 🔐 Security

    - Keep API keys and credentials in environment variables.
    - Add ".env" to ".gitignore".
    - Never publish passwords, private tokens, or secret credentials.
    - Configure the backend's allowed origins for your deployed frontend.


## 👨‍💻 Author

    Kanithi Kali Kowsik 

    - GitHub: "https://github.com/kanithikalikowsik" 
    - LinkedIn: "www.linkedin.com/in/kanithi-kali-kowsik"

## 📄 License

    This project is licensed under the MIT License. See the LICENSE file for details.


## <p align="center">
  🌍 <strong>Explore More. Travel Smarter.</strong> ✈️
</p>