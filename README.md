# Office Management System

## Project Overview
This project is a RESTful Office Management System built using Node.js, Express, and MongoDB for the backend, paired with a React frontend for a modern UI. The system allows for managing departments and employees, including defining relationships between them. It also includes a JWT-based login system for an Admin to manage the application.

**Key Features:**
* **CRUD Operations:** Simple interface for creating, reading, updating, and deleting Departments and Employees.
* **Employee Relationships:** Assign employees to departments and assign supervisors using self-referencing relationships.
* **Advanced Employee Listing:** A RESTful API that implements server-side pagination, search by name/email, and filtering by department or job title.
* **Dynamic Location Data:** Integration with an external API (like CountriesNow or Universal Tutorial API) to dynamically populate Country, State, and City dropdowns in the Employee Create/Edit form.

## Installation & Setup Instructions

**Prerequisites:**
* [Node.js](https://nodejs.org/) installed on your machine.
* [MongoDB](https://www.mongodb.com/) installed locally or a MongoDB Atlas URI.

### 1. Clone the Repository
```bash
git clone <your-github-repo-link>
cd office-management-system
