📝 Task Management Portal

Tech Stack: React (Vite) + NestJS + MongoDB + JWT

📌 Project Overview

This is a full-stack Task Management Portal built using:

Frontend: React (Vite) + Tailwind CSS

Backend: NestJS

Database: MongoDB

Authentication: JWT

The application allows users to register, log in, and manage their personal tasks securely.

Each user can only access and manage their own tasks.

🚀 Features
🔐 Authentication (JWT Based)

User Registration

User Login

Password hashing using bcrypt

JWT token generation

Protected routes using AuthGuard('jwt')

Only authenticated users can access the dashboard

📋 Task Management
✅ Add Task

Title (Required)

Description (Optional)

Status (Default: Pending)

Created At (Auto-generated)

User ID (Linked to logged-in user)

✅ View Tasks

Display all tasks of logged-in user

Show:

Title

Description

Status

Created Date

Clean UI using Tailwind CSS

✅ Mark Task as Completed

Toggle between:

Pending

Completed

✅ Filter Tasks

All

Pending

Completed

🏗️ Project Structure
task-management-portal/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tasks/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│
└── README.md
⚙️ How To Run The Project
🔧 Backend Setup (NestJS)
1️⃣ Navigate to backend
cd backend
2️⃣ Install dependencies
npm install
3️⃣ Create .env file
MONGO_URI=mongodb://localhost:27017/taskportal
JWT_SECRET=your_secret_key
4️⃣ Start backend
npm run start:dev

Backend runs on:

http://localhost:3000
💻 Frontend Setup (React + Vite)
1️⃣ Navigate to frontend
cd frontend
2️⃣ Install dependencies
npm install
3️⃣ Start frontend
npm run dev

Frontend runs on:

http://localhost:5173
🔐 Authentication Flow

User registers using /auth/register

Password is hashed using bcrypt

User logs in using /auth/login

Backend returns:

{
  "access_token": "JWT_TOKEN"
}

Token stored in localStorage

Token sent in header:

Authorization: Bearer <JWT_TOKEN>

Backend validates token using JWT Strategy

📡 API Design (NON AI GENERATED)
🔑 Auth APIs
Register
POST /auth/register

Request Body:

{
  "email": "user@gmail.com",
  "password": "123456"
}
Login
POST /auth/login

Response:

{
  "access_token": "jwt_token_here"
}
📋 Task APIs (Protected)
Create Task
POST /tasks

Headers:

Authorization: Bearer token

Body:

{
  "title": "Complete assignment",
  "description": "Submit before deadline"
}
Get All Tasks
GET /tasks

Returns only logged-in user tasks.

Toggle Task Status
PATCH /tasks/:id

Changes:

Pending → Completed

Completed → Pending

🧠 State Management (NON AI GENERATED)

State management is handled using React built-in hooks:

useState used for:

Task list

Input fields (title, description)

Filter state (All / Pending / Completed)

Authentication token handling

useEffect used for:

Fetching tasks after login

Updating UI after task creation or toggle

No external state management library (Redux, Context API) is used.

JWT token is stored in localStorage for session persistence.

🤖 AI Usage Disclosure

AI tools were used for:

Initial project structure guidance

JWT setup reference

Fixing 401 Unauthorized error

Improving security of toggle route

Generating README template structure

What AI Generated

Basic NestJS module scaffolding guidance

JWT strategy structure

Initial React component layout

Error handling improvements

What I Modified / Implemented Manually

Secured task toggle route using userId validation

Implemented task filtering logic

Designed state management logic

Implemented protected routing in React

Improved validation and error handling

API design section (written manually)

State management explanation (written manually)

🔒 Security Measures

Password hashed using bcrypt

JWT authentication implemented

Tasks filtered by userId

Protected routes using AuthGuard('jwt')

Token required for all task routes

📌 Future Improvements

Edit task

Delete task

Due dates

Pagination

Deployment on cloud

Role-based authentication

👩‍💻 Author

Priya Tripath
