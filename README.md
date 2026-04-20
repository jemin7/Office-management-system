# Office Management System

## 📌 Project Overview
The Office Management System is a full-stack web application built to manage company departments and employees efficiently. It features a RESTful API backend and a modern single-page application frontend. The system supports complex employee relationships (like self-referencing supervisors), server-side pagination, advanced filtering, and dynamic location data fetching using an external API.

### 🚀 Key Features
* **Authentication:** Secure JWT-based Admin login to manage the system.
* **Department Management:** Full CRUD (Create, Read, Update, Delete) operations for organizational departments.
* **Employee Management:** Full CRUD operations for employees with relational data mapping:
  * Assign employees to specific departments.
  * Assign a supervisor to an employee (self-referencing relationship).
* **Advanced Data Handling:** Server-side pagination, search (by name/email), and filtering (by department/job title) for employee listings.
* **Dynamic Location Selection:** Integration with an external API (CountriesNow / Universal Tutorial API) to dynamically populate Country, State, and City dropdowns during employee creation/editing.

---

## 🛠️ Tech Stack
**Frontend:**
* React (Vite)
* Tailwind CSS (or standard CSS)
* Axios (for API requests)

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose ODM
* JSON Web Token (JWT) for Authentication

---

## 📂 Project Structure
The project is divided into two main directories following an MVC architecture on the backend:
* `/client`: Contains the React frontend application.
* `/server`: Contains the Node.js/Express backend API.
