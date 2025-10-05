# Portfolio API

This is the backend API for my personal portfolio website. It's a Node.js application built with Express and TypeScript, providing functionalities for managing blog posts, projects, user authentication, and a contact form.

## Live Deployment

The API is deployed on Vercel and is available at: [https://portfolio-api-eosin.vercel.app/](https://portfolio-api-eosin.vercel.app/)

The frontend for this project can be found at: [https://misbahulhoq.vercel.app/](https://misbahulhoq.vercel.app/)

## Features

- **Blog Management:** Full CRUD functionality for blog posts.
- **Project Management:** Showcase your projects with details.
- **User Authentication:** JWT-based authentication for protected routes.
- **Contact Form:** Endpoint to handle messages from visitors.
- **Database Seeding:** Automatically seeds the database with an admin user.

## Technology Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Email:** Nodemailer
- **Testing:** Jest, Supertest
- **Deployment:** Vercel

## API Endpoints

### Authentication

- `POST /api/v1/auth/login`: User login.
- `POST /api/v1/auth/me`: Get current user information.

### Blog

- `GET /api/v1/blogs`: Get all blog posts.
- `GET /api/v1/blogs/:id`: Get a single blog post.
- `POST /api/v1/blogs`: Create a new blog post (Authentication required).
- `PUT /api/v1/blogs/:id`: Update a blog post (Authentication required).
- `DELETE /api/v1/blogs/:id`: Delete a blog post (Authentication required).

### Project

- `GET /api/v1/projects`: Get all projects.
- `GET /api/v1/projects/:id`: Get a single project.
- `POST /api/v1/projects`: Create a new project (Authentication required).

### Contact

- `POST /api/v1/contact`: Send a message.

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/misbahulhoq/portfolio-api
    cd portfolio-api
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:

    ```
    NODE_ENV=development
    PORT=5000
    DB_URL=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ADMIN_EMAIL=<your-admin-email>
    ADMIN_PASSWORD=<your-admin-password>
    EMAIL_USER=<your-email-address>
    EMAIL_PASS=<your-email-password>
    GEMINI_API_KEY=<your-gemini-api-key>
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

5.  **Run tests:**
    ```bash
    pnpm test
    ```

## Notes

- The project is configured for deployment on Vercel.
- The `index.js` file in the root directory is from a previous version of the project and is not used in the current TypeScript application.
