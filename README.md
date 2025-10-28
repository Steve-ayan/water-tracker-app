# 💧 Water Usage Tracker: Full-Stack Application for SDG 6

## Project Overview

This is a professional full-stack web application developed as the final project for the Power Learn Project Scholarship. The app is designed to help households track and visualize their daily water consumption to promote conservation and support data-driven resource management, aligning directly with **SDG 6: Clean Water and Sanitation**.

The project demonstrates end-to-end expertise in modern web development, security, and data handling.

## Key Features

* **Secure User Authentication:** Registration and Login protected by **JSON Web Tokens (JWT)** and **bcrypt** password hashing.
* **Data Logging:** Users can securely log their total daily water usage.
* **Data Visualization:** A dynamic dashboard displays usage history via **Recharts** (charts and tables).
* **Protected API:** All sensitive endpoints (logging, history retrieval) are protected by JWT Middleware.
* **Resource Alignment:** Provides crucial data for analyzing water demand, a core challenge in Civil Engineering.

---

## 🛠️ Tech Stack

| Layer | Technology | Significance |
| :--- | :--- | :--- |
| **Frontend** | **React.js** (Vite) | Component-based, modern user interface. |
| **Styling/Charts** | **Recharts, Axios** | Data visualization and simplified API calls. |
| **Backend API** | **Node.js, Express.js** | Fast, scalable RESTful API handling business logic and security. |
| **Database** | **PostgreSQL** | Relational, secure storage for user data and time-series usage logs. |
| **Security** | **JWT, bcryptjs** | Industry-standard security for authentication. |

---

## 🚀 Setup and Installation Guide

Follow these steps to clone and run the application locally. **Two separate terminal windows are required.**

### Prerequisites

* **Node.js (LTS)** and **npm** (v10+)
* **PostgreSQL Server** running locally
* **Git** installed

### A. Database Setup (PostgreSQL)

1.  Log into **pgAdmin 4** (or use `psql`).
2.  Create the database: `water_tracker_db`.
3.  Create the application user role: `water_tracker_admin` (set the password).
4.  Run the SQL from `backend/schema.sql` on the `water_tracker_db` to create the tables.

### B. Backend API Server Setup

1.  Clone the repository and navigate to the project root:
    ```bash
    git clone [https://github.com/Steve-ayan/water-tracker-app.git](https://github.com/Steve-ayan/water-tracker-app.git)
    cd water-tracker-app
    ```
2.  **Create and update the `.env` file** in the project root with your PostgreSQL credentials (e.g., `PG_PASSWORD=1234`).
3.  Navigate to the backend folder, install dependencies, and start the server:
    ```bash
    cd backend
    npm install
    npm run server 
    ```
    *(The console should show "✅ Connected to the PostgreSQL database!" and "Server running on port 5000")*

### C. Frontend UI Setup

1.  **Open a second terminal window** and navigate to the frontend folder:
    ```bash
    cd water-tracker-app/frontend
    ```
2.  Install dependencies and start the development server:
    ```bash
    npm install
    npm run dev
    ```

The application will open in your browser at `http://localhost:5173/`. You can now **register a new user** and begin logging water usage data.