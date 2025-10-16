# Fullstack Project: User Auth + Task Management

Overview

This project is a fullstack application built with React.js (frontend) and Node.js + Express + Sequelize + SQLite (backend).

Features include user registration and login with JWT authentication, a protected dashboard accessible only to logged-in users, and task CRUD operations. All users can create and edit tasks. Only Admin users can delete tasks.

# Project Structure:

Frontend (React.js)

The frontend folder contains a public folder and a src folder. Inside src, there is a components folder with TaskForm.js and ProtecedRoute.js, a pages folder with AuthPage.js (registration/login) and Dashboard.js (tasks dashboard), a services folder with api.js for Axios API calls, App.js, and index.js. The frontend folder also contains package.json and README.md.

Backend (Node.js + Express)

The backend folder contains a src folder with a config folder for db.js (Sequelize + SQLite config), a controllers folder with authController.js and taskController.js, a middleware folder with authMiddleware.js and roleMiddleware.js, a models folder with userModel.js and taskModel.js, and a routes folder with authRoutes.js and taskRoutes.js. The backend folder also contains a database folder with database.sqlite, a .env file, server.js, and package.json.

# Setup Instructions:

Backend

Navigate to the backend folder using cd backend.

Install dependencies using npm install.

Create a .env file with the following content:

PORT=5000
JWT_SECRET=mysecretkey
FRONTEND_ORIGIN=http://localhost:3000

Frontend:

Navigate to the frontend folder using cd frontend.

Install dependencies using npm install.

Install jwt-decode using npm install jwt-decode.

Run the React app using npm start. The app runs on http://localhost:3000

Usage

Open http://localhost:3000

Register a new user with a role of User or Admin. After registration, the app automatically goes to the Login page.

Login with the registered credentials to access the Dashboard. On the Dashboard, users can add and edit tasks. Only Admin users can delete tasks.

* Notes

JWT authentication is stored in localStorage after login and used in Axios requests to access protected routes.

SQLite is used for simplicity. The database file is located at backend/database/database.sqlite.

Task permissions: all users can edit tasks, only Admins can delete tasks.

* Dependencies:

Backend dependencies include express, sequelize, sqlite3, bcryptjs, jsonwebtoken, dotenv, and cors.

Frontend dependencies include react, axios, and jwt-decode.

