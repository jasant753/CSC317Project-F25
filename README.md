# Movie Review App (CSC317 Final Project)

## Overview

This project is a Book/Movie Review Site built on top of the CSC317 authentication template.
Users can create accounts, log in, and write reviews (rating + comment) for movies. Other users
can browse movies, read existing reviews, and search by movie title.

### Core Entities

- **User**: Registered account with username, email, password (hashed), and optional profile image.
- **Movie**: A movie stored in the PostgreSQL database. Movies are created automatically when users
  submit reviews for a new title.
- **Review**: Connects a user to a movie and stores a rating (1–5) and an optional text comment.

### Core Features

- User registration and login with server-side validation and password hashing.
- Session management with `express-session` and PostgreSQL-backed session store.
- Protected routes (profile, settings, add review) that require authentication.
- Profile settings page with username update and profile image upload.
- Add a movie review (rating 1–5, optional comment).
  - If the movie does not exist yet, it is created.
- View all movies at `/movies`, with a search bar to filter by title.
- View a single movie at `/movies/:id`, including all reviews for that movie.

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (`pg` library)
- **Authentication:** `bcrypt`, `express-session`, `connect-pg-simple`
- **Templating:** EJS
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Deployment:** Compatible with Render.com using `DATABASE_URL` and `SESSION_SECRET` environment variables.

## Project Structure (Simplified)

- `app.js` – Main application setup (Express, sessions, views, routes, error handling).
- `config/database.js` – PostgreSQL pool and helper functions.
- `scripts/init-db.js` – Creates `users`, `profile_images`, `movies`, `reviews`, and `session` tables.
- `models/` – Database access for:
  - `User`, `Image`, `Movie`, `Review`
- `controllers/` – Logic for:
  - `authController`, `userController`, `reviewController`
- `routes/` – Express routers:
  - `index` (home/about), `auth`, `user`, `reviews`, `movies`
- `views/` – EJS templates for pages and partials.
- `public/` – Static assets (`css/style.css`, `js/main.js`).

## Team Responsibilities

- **Backend & Database:** Authentication, PostgreSQL models, review creation logic.
- **Frontend & Views:** EJS templates, CSS styling, navigation, movies & reviews UI.
- **DevOps / Deployment:** Environment configuration, Render deployment, database initialization.
