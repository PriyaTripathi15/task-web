# Task Management Portal

**Tech Stack:** React (Vite) + NestJS + MongoDB + JWT  
A full-stack Task Management Portal where users can register, log in, and securely manage their personal tasks. Each user can access **only their own tasks**.

---

## Overview

This project is built with:

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** NestJS
- **Database:** MongoDB
- **Authentication:** JWT (with bcrypt password hashing)

---

## Features

### Authentication (JWT-based)
- User Registration
- User Login
- Password hashing using **bcrypt**
- JWT token generation
- Protected routes using `AuthGuard('jwt')`
- Only authenticated users can access the dashboard

### Task Management
- **Add Task**
  - Title (Required)
  - Description (Optional)
  - Status (Default: Pending)
  - Created At (Auto-generated)
  - User ID (Linked to logged-in user)
- **View Tasks**
  - Shows tasks for the logged-in user only
  - Displays: Title, Description, Status, Created Date
- **Toggle Task Status**
  - Pending ↔ Completed
- **Filter Tasks**
  - All / Pending / Completed

---

## Project Structure

```text
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
```

---

## How to Run

### Backend Setup (NestJS)

1. Go to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/taskportal
JWT_SECRET=your_secret_key
```

4. Start backend:
```bash
npm run start:dev
```

Backend will run on:
- `http://localhost:3000`

---

### Frontend Setup (React + Vite)

1. Go to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm run dev
```

Frontend will run on:
- `http://localhost:5173`

---

## Authentication Flow

1. User registers via `POST /auth/register`
2. Password is hashed using bcrypt
3. User logs in via `POST /auth/login`
4. Backend returns:
```json
{
  "access_token": "JWT_TOKEN"
}
```

5. Token is stored in `localStorage`
6. For protected requests, token is sent as:
```http
Authorization: Bearer <JWT_TOKEN>
```

7. Backend validates token using JWT Strategy

---

## API Design (Non-AI Generated)

### Auth APIs

#### Register
- **POST** `/auth/register`

Request body:
```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

#### Login
- **POST** `/auth/login`

Response:
```json
{
  "access_token": "jwt_token_here"
}
```

---

### Task APIs (Protected)

#### Create Task
- **POST** `/tasks`

Headers:
```http
Authorization: Bearer <token>
```

Body:
```json
{
  "title": "Complete assignment",
  "description": "Submit before deadline"
}
```

#### Get All Tasks
- **GET** `/tasks`  
Returns only the logged-in user's tasks.

#### Toggle Task Status
- **PATCH** `/tasks/:id`  
Changes status:
- Pending → Completed
- Completed → Pending

---

## State Management (Non-AI Generated)

State management is handled using React built-in hooks:

- `useState` for:
  - Task list
  - Input fields (title, description)
  - Filter state (All / Pending / Completed)
  - Authentication token handling
- `useEffect` for:
  - Fetching tasks after login
  - Updating UI after task creation or toggle

No external state management library (Redux / Context) is used.  
JWT token is stored in `localStorage` for session persistence.

---

## AI Usage Disclosure

AI tools were used for:
- Initial project structure guidance
- JWT setup reference
- Fixing 401 Unauthorized error
- Improving security of toggle route
- Generating README template structure

### What AI Generated
- Basic NestJS module scaffolding guidance
- JWT strategy structure
- Initial React component layout
- Error handling improvements

### What I Modified / Implemented Manually
- Secured task toggle route using userId validation
- Implemented task filtering logic
- Designed state management logic
- Implemented protected routing in React
- Improved validation and error handling
- API design section (written manually)
- State management explanation (written manually)

---

## Security Measures
- Password hashed using bcrypt
- JWT authentication implemented
- Tasks filtered by userId
- Protected routes using `AuthGuard('jwt')`
- Token required for all task routes

---

## Future Improvements
- Edit task
- Delete task
- Due dates
- Pagination
- Deployment on cloud
- Role-based authentication

---

## Author
**Priya Tripathi**
