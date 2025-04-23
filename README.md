# Angular-Nest Todo Application

This project is a full-stack Todo application built with Angular for the frontend and NestJS for the backend. It demonstrates a simple yet effective way to manage tasks with user authentication and authorization.

## Features

- **User Authentication:** Secure login and registration using JWT.
- **Task Management:** Create, view, and manage todos.
- **User-Specific Todos:** Each user can only view and manage their own todos.
- **Responsive Design:** Built with Angular Material for a modern UI.
- **API Documentation:** Swagger documentation for backend APIs.
- **Upcoming Features:** Edit and delete functionality for todos in the frontend.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14 or later recommended).
- **Angular CLI**: Install Angular CLI globally using `npm install -g @angular/cli`.
- **NestJS CLI**: Install NestJS CLI globally using `npm install -g @nestjs/cli`.
- **PostgreSQL**: Ensure you have a PostgreSQL database running.

## Getting Started

### Backend Setup (NestJS)

1. **Navigate to the backend directory:**

   ```bash
   cd nest
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure the database:**

   - Create a `.env` file in the `nest` directory with the following content:

     ```plaintext
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USER=your_db_user
     DATABASE_PASSWORD=your_db_password
     DATABASE_NAME=your_db_name
     JWT_SECRET=your_jwt_secret
     ```

4. **Run database migrations:**

   ```bash
   npm run typeorm migration:run
   ```

5. **Start the backend server:**

   ```bash
   npm run start:dev
   ```

   The backend server will start on `http://localhost:3000`.

### Frontend Setup (Angular)

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend server:**

   ```bash
   npm start
   ```

   The frontend application will start on `http://localhost:4200`.

## API Documentation

- Access the Swagger API documentation at `http://localhost:3000/api`.

## Development

- **Backend:** Use `npm run start:dev` for hot-reloading during development.
- **Frontend:** Use `ng serve` for live-reloading during development.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
