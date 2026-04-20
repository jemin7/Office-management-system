
# Office Management System

A full-stack Office Management System built with **React + Node.js/Express + MongoDB**.  
It allows managing departments and employees with proper relationships, dynamic location selection (Country → State → City), authentication, and more.

**Live Demo**: (Add link if deployed)  
**Assignment Submission**: [GitHub Repo](https://github.com/jemin7/Office-management-system)

## 📋 Project Overview

This project fulfills the **Node.js Office Management System** assignment requirements:

- Full CRUD for **Departments** and **Employees**
- Employee → Department relationship
- Self-referencing **Supervisor** feature (one employee can supervise others)
- Dynamic **Country, State, City** dropdowns using external API
- Server-side **Pagination, Search & Filter**
- JWT-based **Authentication** (Bonus)
- Modern **React** frontend (Bonus – instead of EJS/Pug)

## ✨ Features

### Backend
- RESTful API with Express
- MongoDB + Mongoose (Models with proper relationships)
- Employee CRUD + Populate (Department & Supervisor)
- Department CRUD
- Pagination, Search by name/email, Filter by department
- JWT Authentication

### Frontend
- Modern React + Vite
- Employee & Department Management
- Dynamic Country → State → City dropdowns (using CountriesNow API)
- Responsive UI with dark theme
- Form validation and error handling

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React, Vite, JavaScript, CSS        |
| Backend    | Node.js, Express                    |
| Database   | MongoDB + Mongoose                  |
| Auth       | JWT                                 |
| External API | CountriesNow (Country/State/City) |
| HTTP Client | Axios                              |

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/jemin7/Office-management-system.git
cd Office-management-system
2. Backend Setup
Bashcd server
npm install

# Create .env file (see .env.example)
cp .env.example .env
.env variables needed:
envPORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
3. Frontend Setup
Bashcd ../client
npm install
4. Run the application
Terminal 1 – Backend
Bashcd server
npm start
Terminal 2 – Frontend
Bashcd client
npm run dev
Open http://localhost:5173 in your browser.
📌 API Endpoints (Backend)
Departments

GET /api/departments – Get all departments
POST /api/departments – Create department
PUT /api/departments/:id – Update department
DELETE /api/departments/:id – Delete department

Employees

GET /api/employees – Get employees (with pagination, search, filter)
POST /api/employees – Create employee
GET /api/employees/:id – Get single employee
PUT /api/employees/:id – Update employee
DELETE /api/employees/:id – Delete employee

📁 Project Structure
textOffice-management-system/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── pages/          # EmployeeForm, Employees, etc.
│   │   ├── components/
│   │   └── api/axios.js
│   └── package.json
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── middleware/
│   ├── server.js
│   └── package.json
├── README.md
└── .gitignore
✅ Assignment Requirements Fulfilled

 Department & Employee CRUD
 Department selection when creating employee
 Supervisor (self-referencing)
 Server-side Pagination, Search, Filter
 External API for Country → State → City
 Proper MVC structure
Bonus: React frontend + JWT Authentication
