TheMet – Metropolitan Museum Explorer 🎨

TheMet is a React-based web application inspired by the Metropolitan Museum of Art.
The project allows users to explore artworks, search collections, like artworks, and interact through comments, while implementing authentication, protected routes, and external API integration.

📌 Project Overview

This application demonstrate:

User authentication and session management

Protected routes

External API integration

Clean React architecture

Proper state management and UI handling

The project is built using React.js.

🛠️ Technology Stack

Frontend: React.js (Vite)

Routing: React Router

Styling: CSS3 (index.css)

State Management: React Context API + Hooks

HTTP Requests: Fetch API

Backend (PHP):

API proxy for Met Museum API

Profile page integration

Comments handling

🔐 Authentication Features

User registration and login

Secure password hashing using SHA-256

Session persistence using localStorage

User profile page

Logout functionality

🛡️ Protected Routes

Private routes are protected using a ProtectedRoute component

Unauthenticated users are redirected to the login page

Navigation guards ensure secure access

User roles are stored (default: user)

🌐 External API Integration

Metropolitan Museum of Art API

Artwork search

Departments

Artwork details

PHP proxy is used to avoid CORS issues

Error handling and loading states are implemented

⭐ Main Features

Home Page

Displays artworks with caching and prefetching

Load more functionality

Search Page

Dedicated full-width search bar

Search results with pagination

Departments

Browse artworks by department

Likes Page

Save favorite artworks

Persistent across sessions

Artwork Modal

Detailed artwork view

Comments section

Profile Page

Displays user information

PHP integration for backend requirement

📁 Project Structure
TheMet/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── php/
│   ├── met_proxy.php
│   ├── profile.php
│   ├── comments.php
│   └── comments_get.php
│
├── public/
├── package.json
└── README.md

⚙️ Installation & Run Instructions
1️⃣ Install dependencies
npm install

2️⃣ Run the React application
npm run dev


The app will run on:

http://localhost:5173

3️⃣ PHP Setup

Place the project inside xampp/htdocs/TheMet

Start Apache from XAMPP

PHP files are accessed via:

http://localhost/TheMet/php/

4 Live Demo (Recommended)
The application is deployed and available online via GitHub:

🔗 **Live Demo:** https://raya-alyoubi.github.io/TheMet-Metropolitan_Museum_Explorer/#/

No local setup is required to use the application.

also The application is deployed and available online via Netlify:

🔗 **Live Demo:** https://joyful-begonia-409079.netlify.app

No local setup is required to use the application.

📱 Responsiveness

Responsive layout for desktop, tablets and phones

Grid-based layout adapts to screen size

Sticky navigation bar

⚠️ Notes & Limitations

Role-based access control is partially implemented (role exists but no admin-only pages).

Comments persistence depends on PHP backend storage.

Accessibility can be further improved with ARIA attributes.

👤 Author

Developed by: Raya Alyoubi
Year: 2025
