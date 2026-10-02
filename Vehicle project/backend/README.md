# MERN Stack Project

## Overview
This project is a MERN (MongoDB, Express, React, Node.js) stack application that provides user authentication and management functionalities. It includes a backend built with Node.js and Express, which interacts with a MongoDB database.

## Project Structure
```
backend
├── src
│   ├── controllers
│   │   └── userController.js
│   ├── models
│   │   └── userModel.js
│   ├── routes
│   │   └── userRoutes.js
│   ├── config
│   │   └── db.js
│   ├── middleware
│   │   └── authMiddleware.js
│   └── server.js
├── package.json
├── .env
└── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### User Routes
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Authenticate a user and return a token.
- **GET /api/users/profile**: Retrieve user profile information (requires authentication).

## Usage Examples
- To register a new user, send a POST request to `/api/users/register` with the user details in the request body.
- To log in, send a POST request to `/api/users/login` with the email and password.
- To access the user profile, send a GET request to `/api/users/profile` with the token in the authorization header.

## License
This project is licensed under the MIT License.