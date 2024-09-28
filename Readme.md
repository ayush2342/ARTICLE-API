# Authentication and Article CRUD API

This repository contains a backend application built with Node.js, Express, and MongoDB that provides authentication APIs for an Android app, as well as CRUD operations for articles. 

## Table of Contents

- [Features]
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Postman Collection](#postman-collection)
- [Database Dump](#database-dump)


## Features

- User registration and login with JWT authentication
- Get user profile
- CRUD operations for articles (with authentication)
- Source verification for pre-login requests

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT)
- Passport.js for authentication
- dotenv for environment variable management
- CORS for handling cross-origin requests

## API Endpoints

### User Endpoints

- **Register User**
  - `POST /api/v1/register`
  
- **Login User**
  - `POST /api/v1/login`
  
- **Get User Profile**
  - `GET /api/v1/get-profile` (requires authentication)

### Article Endpoints

- **Create Article**
  - `POST /api/v1/articles` (requires authentication)
  
- **Get All Articles**
  - `GET /api/v1/articles` (public access)
  
- **Get Article by ID**
  - `GET /api/v1/articles/:id` (public access)
  
- **Update Article**
  - `PUT /api/v1/articles/:id` (requires authentication)
  
- **Delete Article**
  - `DELETE /api/v1/articles/:id` (requires authentication)

## Getting Started

To get started with the project, follow these steps:

1. Clone this repository to your local machine:
   git clone <repository-url>

2. Navigate to the project directory:
    cd <project-directory>

3. Install the required dependencies:
    npm install

## Environment Variables

Create a .env file in the root of your project and add the following environment variables:
    PORT=8000
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=mongodb://localhost:27017/your_database_name

## Database Setup

Ensure you have MongoDB installed and running on your machine.
Create a new database for this application.

## Running the Application

To start the server, use the following command:
npm start

The server will run on http://localhost:8000.

## Postman Collection
A Postman collection is provided in the repository for testing the API endpoints. You can import it into your Postman application to quickly test the endpoints.

## Database Dump
A database dump is also provided in the zip format for your reference.


### Notes:
- Replace `<repository-url>` and `<project-directory>` with the actual URL of your GitHub repository and the directory name of your project.
- Make sure to update the `MONGODB_URI` in the `.env` section to reflect your actual MongoDB connection string.

