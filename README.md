🍽️ SmartDine

Full-Stack Food Ordering & Restaurant Management Platform

<p align="center">
  A modern, responsive food ordering application designed to simplify customer ordering and restaurant operations.
</p><p align="center">
  React • Tailwind CSS • Node.js • Express.js • PostgreSQL
</p><p align="center">
  <a href="#-project-overview">Overview</a> •
  <a href="#-key-features">Features</a> •
  <a href="#️-system-architecture">Architecture</a> •
  <a href="#-technology-stack">Tech Stack</a> •
  <a href="#️-installation--setup">Setup</a> •
  <a href="#-testing--validation">Testing</a>
</p>---

📑 Table of Contents

- "📌 Project Overview" (#-project-overview)
- "✨ Key Features" (#-key-features)
  - "Customer Experience" (#-customer-experience)
  - "Admin Dashboard" (#️-restaurant-admin-dashboard)
  - "UI / UX" (#-ui--ux)
- "🖥️ Application Workflows" (#️-application-screens--workflows)
  - "Customer Workflow" (#customer-workflow)
  - "Admin Workflow" (#admin-workflow)
- "🏗️ System Architecture" (#️-system-architecture)
- "🧰 Technology Stack" (#-technology-stack)
- "📂 Project Structure" (#-project-structure)
- "🔌 REST API Overview" (#-rest-api-overview)
- "⚙️ Installation & Setup" (#️-installation--setup)
- "🧪 Testing & Validation" (#-testing--validation)
- "💡 Development Approach" (#-development-approach)
- "🎯 Learning Outcomes" (#-learning-outcomes)
- "🔮 Future Enhancements" (#-future-enhancements)
- "🔐 Security & Production Readiness" (#-security--production-readiness)
- "👨‍💻 Project Information" (#-project-information)
- "🤝 Contributions" (#-contributions)
- "📄 License" (#-license)

---

📌 Project Overview

SmartDine is a full-stack food ordering web application developed to simplify online food ordering and restaurant management through a unified digital platform.

The application provides customers with an intuitive interface to explore food items, manage their shopping cart, place orders, and view order information. It also provides an administrative dashboard for managing menu items, monitoring customer orders, reviewing feedback, and viewing business analytics.

SmartDine was developed from scratch through prompt engineering, iterative implementation, debugging, and manual testing. The project demonstrates practical experience in frontend development, backend API integration, database operations, authentication, and end-to-end application workflow design.

The primary objective was to build a functional, user-friendly application while gaining hands-on experience with modern full-stack development practices.

✨ Key Features

🛒 Customer Experience

- Interactive Food Menu — Browse food items with images, descriptions, prices, and categories.
- Food Category Filtering — Explore menu items by category.
- Search Functionality — Find food items through the menu interface.
- Shopping Cart — Add food items, manage quantities, and review order totals.
- User Authentication — Customer registration and login.
- Checkout System — Enter delivery details and select a payment method.
- Order Placement — Submit orders through the backend API.
- Order History — View previously placed orders.
- Order Status Tracking — View order progress through status updates.
- Customer Reviews — View customer feedback and ratings.

🛠️ Restaurant Admin Dashboard

- Admin Authentication — Dedicated administrator login.
- Dashboard Analytics — View order statistics and business metrics.
- Menu Management — Add, update, and delete food items.
- Order Management — View customer orders and update order status.
- Customer Reviews Management — View and manage customer feedback.
- Protected Admin Pages — Restrict administrative frontend routes to authenticated administrators.

🎨 UI / UX

- Responsive layouts for different screen sizes.
- Modern interface with consistent colors and styling.
- Reusable React components.
- Interactive navigation and admin dropdown menus.
- Toast notifications for user actions.
- Organized food cards and menu layouts.
- Dedicated customer and administrator interfaces.

🖥️ Application Screens & Workflows

Customer Workflow

             Home Page
                 │
                 ▼
          Browse Food Menu
                 │
                 ▼
          Select Food Items
                 │
                 ▼
           Add to Cart
                 │
                 ▼
           Review Cart
                 │
                 ▼
        User Authentication
                 │
                 ▼
       Enter Delivery Details
                 │
                 ▼
        Select Payment Method
                 │
                 ▼
            Place Order
                 │
                 ▼
          Order Confirmation
                 │
                 ▼
       View Order History/Status

Admin Workflow

             Admin Login
                 │
                 ▼
          Admin Dashboard
                 │
       ┌─────────┼──────────┐
       ▼         ▼          ▼
   Analytics   Menu       Reviews
               Management  Management
                 │
                 ▼
          Order Management
                 │
                 ▼
         Update Order Status

🏗️ System Architecture

SmartDine follows a client-server architecture consisting of a React frontend, Express.js backend, and PostgreSQL database.

┌──────────────────────────────────────────┐
│                CLIENT SIDE               │
│                                          │
│           React + Vite                   │
│           Tailwind CSS                   │
│                                          │
│  Home | Menu | Cart | Checkout           │
│  Login | Orders | Admin Dashboard        │
│                                          │
│  Context API | React Router              │
└────────────────────┬─────────────────────┘
                     │
                     │ HTTP / REST API
                     │ JSON Requests
                     ▼
┌──────────────────────────────────────────┐
│               SERVER SIDE                │
│                                          │
│            Node.js + Express             │
│                                          │
│  Authentication & Authorization          │
│  Menu API | Order API                    │
│  Admin API | Reviews API                 │
│                                          │
│  JWT Middleware                          │
│  Request Handling                        │
│  Database Query Execution                │
└────────────────────┬─────────────────────┘
                     │
                     │ SQL Queries
                     ▼
┌──────────────────────────────────────────┐
│                DATABASE                  │
│                                          │
│              PostgreSQL                  │
│                                          │
│  Users | Admins | Menu                   │
│  Orders | Reviews                        │
└──────────────────────────────────────────┘

Architecture Highlights

- React builds the interactive user interface.
- Vite provides frontend development and build tooling.
- React Router manages client-side navigation.
- Context API manages shared authentication and cart state.
- Axios / Fetch API communicate with backend endpoints.
- Express.js handles REST API requests and application logic.
- JWT supports token-based authentication.
- bcryptjs provides password hashing and verification.
- PostgreSQL stores application data.
- Parameterized SQL queries help prevent SQL injection when used consistently.

🧰 Technology Stack

Category| Technologies
Frontend| React, JavaScript, HTML5, CSS
Build Tool| Vite
Styling| Tailwind CSS
Routing| React Router
State Management| React Context API, Hooks
HTTP Communication| Axios, Fetch API
Notifications| React Toastify
Charts| Recharts
Backend| Node.js, Express.js
Database| PostgreSQL
Database Driver| node-postgres ("pg")
Authentication| JSON Web Tokens (JWT)
Password Security| bcryptjs
Development Tools| Git, GitHub, VS Code, npm

📂 Project Structure

SmartDine/
│
├── Images/
│   └── Food item images
│
├── client/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.jsx
│   │   │   └── menuApi.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Careers.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminOrders.jsx
│   │   │   ├── AdminReviews.jsx
│   │   │   └── Admin.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminAuth.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── AdminRoutes.js
│   │   ├── menuroutes.js
│   │   ├── orderRoutes.js
│   │   └── reviewRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── package.json
├── package-lock.json
└── README.md

🔌 REST API Overview

The backend exposes RESTful endpoints for authentication, menu management, order processing, and customer reviews.

Authentication

Method| Endpoint| Description
POST| "/api/auth/register"| Register a customer
POST| "/api/auth/login"| Authenticate a customer
POST| "/api/admin/login"| Authenticate an administrator

Menu Management

Method| Endpoint| Description
GET| "/api/menu"| Retrieve menu items
POST| "/api/menu"| Add a food item
PUT| "/api/menu/:id"| Update a food item
DELETE| "/api/menu/:id"| Delete a food item

Orders

Method| Endpoint| Description
POST| "/api/orders"| Place a customer order
GET| "/api/orders"| Retrieve authenticated user's orders
GET| "/api/orders/all"| Retrieve all orders
PUT| "/api/orders/:id"| Update order status
GET| "/api/orders/admin/stats"| Retrieve dashboard statistics

Customer Reviews

Method| Endpoint| Description
GET| "/api/reviews"| Retrieve customer reviews
POST| "/api/reviews"| Submit a review
DELETE| "/api/reviews/:id"| Delete a review

«Note: API availability and authorization requirements depend on the backend route configuration. Verify each endpoint before deployment.»

⚙️ Installation & Setup

Prerequisites

Ensure the following tools are installed:

- Node.js
- npm
- PostgreSQL
- Git
- Visual Studio Code or another code editor

1. Clone the Repository

git clone https://github.com/YOUR_USERNAME/SmartDine.git
cd SmartDine

Replace "YOUR_USERNAME" with your GitHub username and use the actual repository URL.

2. Install Dependencies

Install root-level dependencies:

npm install

Install frontend dependencies:

cd client
npm install

Install backend dependencies:

cd ../server
npm install

3. Configure Environment Variables

Create a ".env" file inside the "server" directory:

PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_random_secret

Create a ".env" file inside the "client" directory:

VITE_API_URL=http://localhost:5000

Important: Replace example values with your actual configuration. Never commit environment files, database credentials, or JWT secrets to GitHub.

4. Configure PostgreSQL

Create a PostgreSQL database and configure the connection string in "server/.env".

The application requires database tables for:

- Users
- Administrators
- Menu items
- Orders
- Customer reviews

Ensure the schema contains the columns referenced by the backend SQL queries.

Database schema and seed data should be configured before starting the application.

5. Start the Backend

cd server
npm run dev

The backend should run at:

http://localhost:5000

Use the appropriate script defined in "server/package.json" if the development script differs.

6. Start the Frontend

Open another terminal:

cd client
npm run dev

Vite will display the local development URL, typically:

http://localhost:5173

Open the displayed URL in your browser.

🧪 Testing & Validation

SmartDine was developed through iterative implementation and manual functional testing of customer and administrator workflows.

Testing focused on validating user interactions, API communication, database operations, authentication flows, and order management.

Test Area| Validation Focus
User Registration| Form validation and account creation
User Login| Credential validation and authentication
Menu| Loading and displaying food items
Cart| Adding items and updating quantities
Checkout| Delivery details and payment selection
Order Placement| Submitting and saving orders
Order History| Retrieving user-specific orders
Admin Login| Administrator authentication
Menu Management| Adding, editing, and deleting menu items
Order Management| Viewing orders and changing status
Dashboard| Retrieving order and revenue statistics
Reviews| Viewing and managing feedback
Navigation| Route transitions and protected pages

Testing was performed manually during development. Automated test coverage and formal production security testing are not claimed.

💡 Development Approach

Built from Scratch Using Prompt Engineering and Manual Testing

SmartDine was developed from the ground up using an iterative software development workflow that combined prompt engineering as a development aid with direct implementation, code review, debugging, and manual validation.

The development process included:

1. Defining application requirements and customer/admin workflows.
2. Breaking the application into frontend, backend, database, and API components.
3. Using structured prompts to assist with implementation planning, code generation, debugging, and UI refinement.
4. Reviewing and adapting generated code to fit the project architecture.
5. Integrating frontend components with backend REST APIs.
6. Testing application workflows manually.
7. Identifying errors and refining functionality through iterative debugging.
8. Improving usability, responsiveness, and consistency across the application.

Prompt engineering was used as a productivity technique—not as a replacement for understanding the code, making technical decisions, or validating application behavior.

The project demonstrates practical use of AI-assisted development alongside human implementation, debugging, and hands-on testing.

🎯 Learning Outcomes

Through this project, practical experience was gained in:

- Full-stack web application development.
- Component-based frontend architecture.
- REST API design and integration.
- Authentication and authorization concepts.
- Relational database operations using PostgreSQL.
- CRUD application development.
- Shared state management with React Context.
- Admin dashboard and analytics implementation.
- Debugging and manual software testing.
- Prompt engineering for software development.
- Git-based version control and project management.

🔮 Future Enhancements

Potential improvements include:

- Online payment gateway integration.
- Real-time order updates using WebSockets.
- Automated unit and integration testing.
- Enhanced role-based authorization and API security.
- Database schema migrations and seed scripts.
- Multi-restaurant support.
- Advanced analytics and reporting.
- Deployment with CI/CD pipelines.
- Customer profile and address management.
- Accessibility and performance optimization.

🔐 Security & Production Readiness

SmartDine is an academic full-stack development project and should be treated as a development/demo application until additional production hardening is completed.

Before production deployment, the application should include:

- Server-side authorization for every admin-only endpoint.
- Ownership checks for customer order access.
- Input validation and request sanitization.
- Secure token storage and session handling.
- Rate limiting and stronger authentication protections.
- Restricted CORS configuration.
- Database schema and migration scripts.
- Error handling that avoids exposing internal details.
- HTTPS and secure deployment configuration.

Frontend route protection alone is not sufficient to secure backend APIs.

👨‍💻 Project Information

Attribute| Details
Project Name| SmartDine
Project Type| Full-Stack Food Ordering Web Application
Domain| Web Development / Restaurant Management
Frontend| React
Backend| Node.js, Express.js
Database| PostgreSQL
Development Method| Prompt Engineering, Iterative Development & Manual Testing
Project Status| Academic Development Project

🤝 Contributions

Suggestions, feedback, and improvements are welcome.

If you find an issue or have an enhancement idea, feel free to open an issue or submit a pull request.

📄 License

This project is intended for educational and portfolio purposes.

A formal open-source license can be added to define reuse, modification, and distribution permissions.

---

<p align="center">
  <strong>SmartDine — Bringing food ordering and restaurant management together through technology.</strong>
</p>
