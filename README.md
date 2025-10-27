# Favs App

This is a full-stack application for managing a list of your favorite things, built with a React frontend and a Node.js backend.

## Cloning the Repository

To get started, clone the repository to your local machine:

```bash
git clone <repository-url>
cd favs-app
```

---

## Backend (Server)

### Tech Stack
- **Framework**: Express
- **Language**: TypeScript
- **ORM**: Prisma with MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **File Uploads**: Multer

### Folder Structure

```
server/
├── prisma/              # Prisma schema and migration files
│   └── schema.prisma
├── src/
│   ├── controllers/     # Request handlers (authController.ts, entryController.ts)
│   ├── middleware/        # Express middleware (authMiddleware.ts)
│   ├── routes/            # API routes (authRoutes.ts, entryRoutes.ts)
│   ├── utils/             # Utility functions (generateToken.ts)
│   ├── uploads/           # Directory for uploaded images
│   └── app.ts             # Express application setup
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

### Setup and Running

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `server` directory and add the following:
    ```dotenv
    # Example
    DATABASE_URL="mysql://root:password@localhost:3306/favorite_media"
    JWT_SECRET="yourSecret123"
    PORT=5000
    ```

4.  **Run database migrations:**
    This will create the necessary tables in your database based on the Prisma schema.
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the server:**
    ```bash
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:5000`).

---

## Frontend (Client)

### Tech Stack
- **Framework**: React with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Form Management**: React Hook Form
- **API Communication**: Axios

### Folder Structure

```
client/
├── src/
│   ├── api/               # API call definitions (axios, entries.ts, auth.ts)
│   ├── components/        # Reusable React components (EntryRow.tsx)
│   ├── context/           # AuthContext for managing user authentication
│   ├── hooks/             # Custom hooks (useInfiniteEntries.ts)
│   ├── pages/             # Page components (Dashboard.tsx, Login.tsx, etc.)
│   ├── App.tsx            # Main application component with routing
│   └── main.tsx           # Application entry point
├── .env.local           # Environment variables for the client
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json
```

### Setup and Running

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the `client` directory and add the API base URL:
    ```dotenv
    # Example
    VITE_API_BASE=http://localhost:5000/api
    ```

4.  **Run the client:**
    ```bash
    npm run dev
    ```
    The client will start on `http://localhost:5173` (or another available port).
