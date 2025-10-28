# 🏛️ Application Architecture and Data Flow

## System Design

The Water Usage Tracker utilizes a **Monolithic Full-Stack** architecture, separated into three distinct but highly integrated tiers: the Presentation Layer (Frontend), the Application Layer (Backend), and the Data Layer (Database).

### 1. Presentation Layer (React Frontend)

* **Role:** Handles all user interaction, state management (via Auth Context), and data display.
* **Data Consumption:** Uses **Axios** to communicate exclusively with the `/api` endpoints provided by the backend.
* **Visualization:** Renders historical usage data using **Recharts**.

### 2. Application Layer (Node.js/Express Backend)

* **Role:** Acts as the secure gateway between the frontend and the database.
* **Security:** Implements **JWT Middleware** to protect all private data routes, ensuring data integrity.
* **Business Logic:** Handles password hashing, token generation, and input validation.

### 3. Data Layer (PostgreSQL)

* **Role:** Provides secure, persistent storage for relational data.
* **Tables:** Includes `users` (authentication data) and `usage_log` (time-series consumption data).

---

## 🔄 Critical Data Flow: Logging Usage

This process demonstrates the secure, end-to-end operation of the system:

1.  **Authentication (Login):** User sends credentials to `/api/auth/login`. The server verifies them against the **bcrypt hash** in PostgreSQL and returns a **JWT Token**.

2.  **Request Initiation:** The user enters a usage value (e.g., `450 L`) on the React Dashboard and submits the form.

3.  **Token Transport:** The React frontend automatically attaches the **JWT Token** to the request in the `Authorization: Bearer <TOKEN>` header.

4.  **Security Check (Middleware):** The **`authMiddleware.js`** function intercepts the `POST /api/usage/log` request. It decodes the JWT, verifies its signature against the `JWT_SECRET`, and finds the corresponding user in the database.

5.  **Controller Execution:** If authorized, the request proceeds to the `usageController.js`. It executes the SQL **`INSERT`** query via the `usageModel.js` into the secured **`usage_log`** table.

6.  **Response:** The backend returns a `201 Created` status, triggering the frontend to automatically refresh and display the newly saved data on the chart.

---

## 🎯 Alignment with SDG 6 (Civil Engineering Context)

This project is a functional demonstration of a system essential for modern water utility management:

* **Demand Management:** By providing individual households with clear, timely data, the app facilitates behavioral change, which is the most cost-effective way to reduce strain on existing water treatment and distribution infrastructure.
* **Data for Planning:** The `usage_log` table captures time-series data crucial for civil engineers who perform **demand forecasting** and need to identify peak consumption periods to design resilient infrastructure (pipes, pumps, and reservoirs).