# IntelliSQR

## Overview

IntelliSQR is a web application that allows users to register and log in securely. It is built using the **MERN** stack with **Prisma** as the ORM for MongoDB. The frontend is developed with **React.js**, while the backend is powered by **Node.js** and **Express.js**.

## Features

- **User Authentication**: Secure sign-up and login with JWT-based authentication.
- **Database Management**: Uses Prisma ORM with MongoDB.
- **State Management**: React hooks and form validation using `react-hook-form` and `zod`.
- **Notifications**: Real-time toast notifications using `react-toastify`.
- **Secure Password Handling**: Uses `bcryptjs` for password hashing.
- **CORS Support**: Configured for frontend-backend communication.

## Tech Stack

### Frontend:

- React.js
- React Router
- React Hook Form
- Zod (Schema validation)
- Bootstrap (UI Styling)
- Toastify (Notifications)

### Backend:

- Node.js
- Express.js
- Prisma ORM
- MongoDB
- bcryptjs (Password hashing)
- Cookie-parser (JWT authentication)

## Installation & Setup

### Prerequisites

- **Node.js**
- **MongoDB** (Atlas or Local Instance)

### Steps

1. **Clone the repository**

   git clone https://github.com/mohitsharma1507/IntelliSQR.git
   cd IntelliSQR

2. **Set up environment variables**
   Create a `.env` file in the root directory and add:

   DATABASE_URL="mongodb+srv://chaudharyprisma437:6Xe5CXIlSfz4iE7N@cluster0.rnnspe2.mongodb.net/Intellisqr?retryWrites=true&w=majority&appName=Cluster0"
   NODE_ENV=development
   PORT=8080
   TOKEN_KEY="myTokenHere"

3. **Install dependencies**

   npm install

4. **Start the backend server**

   npx ts-node src/app.ts

5. **Navigate to the frontend directory and install dependencies**

   cd Frontend
   npm install

6. **Start the frontend**

   npm run dev

## API Endpoints

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | `/signup` | Register a new user |
| POST   | `/login`  | Authenticate user   |

## Troubleshooting

### Common Issues:

- **CORS Error**: Ensure the backend allows requests from `http://localhost:5173` in `cors()` middleware.
- **Prisma MongoDB Support Issue**: Prisma does not support some CLI commands like `prisma migrate dev`. Instead, use `prisma db push` to sync schema.
- **MongoDB Connection Issues**: Verify your `DATABASE_URL` in `.env`.

## Author

**Mohit Sharma**
