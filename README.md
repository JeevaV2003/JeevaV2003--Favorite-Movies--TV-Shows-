## Favs App
Favorite Movies & TV Shows is a full-stack web application that helps users create and manage a personal catalog of movies and TV shows they love. It offers a clean, responsive UI and a robust backend so users can add, view, edit, and remove entries containing rich details — everything from title and director to budget, location, duration, year/time, posters, and custom notes. The entries are displayed in a table with infinite scrolling, loading more records as the user scrolls for a smooth, scalable browsing experience.

## Key features

- Add new movie/TV show entries with detailed fields (title, type, director, budget, location, duration, year/time, notes, poster).
- View all entries in a paginated/infinite-scroll table that loads additional records as you scroll.
- Edit existing entries and update any field, including replacing or adding a poster image.
- Delete entries with confirmation to prevent accidental removal.
- Search and filter the table by title, type, director, year, and other fields.
- User authentication (signup / login / logout) to keep each user’s list private.
- Poster/image upload support (local uploads or cloud storage like Cloudinary/S3).
- Backend validation, secure JWT auth, and a Prisma-powered relational database.

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
