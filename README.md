# Movie Review App (CSC317 Final Project)
## Team:
- Justin Santos
- Jiaming Yu
- Abraham Kao
- Joaquin Molina

## Overview

This project is a Movie Review Site inspired by sites such as Letterboxd, built on top of the CSC317 authentication template.Users can create accounts, log in, and write reviews (rating + comment) for movies. Other users
can browse movies, read existing reviews, and search by movie title.

### Core Entities

- **User**: Registered account with username, email, password (hashed), and optional profile image.
- **Movie**: A movie stored in the PostgreSQL database. Movies are created automatically when users
  submit reviews for a new title.
- **Review**: Connects a user to a movie and stores a rating (1–5) and an optional text comment.

### Core Features

- Authentication & Sessions
  - User registration and login with server-side validation
  - Session management with `express-session` and PostgreSQL-backed session store.
  - Protected routes (profile, settings, add review) that require authentication.
  - Profile settings page with username update and profile image upload.
- Reviews & Movies
  - Add a movie review (rating 1–5, optional comment)
  - If the movie does not exist yet, it is created.
  - View all movies at `/movies`, ordered alphabetically
  - Search movies by title using a case-insensitive search bar
  - View a single movie at `/movies/:id`, including all reviews for that movie
- Discovery & Browsing
  - Homepage displays a selection of random reviews to highlight site activity
  - Movie titles link to their individual review pages
  - Ratings are displayed visually
- Members (User Discovery)
  - Browse and search for users by username at `/members`
  - View a public member page at `/members/:username`
  - Displays all reviews written by that user in one place
  - Each review links back to the corresponding movie

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (`pg` library)
- **Authentication:** `bcrypt`, `express-session`, `connect-pg-simple`
- **Templating:** EJS
- **Frontend:** HTML, CSS, vanilla JavaScript
- **Deployment:** Compatible with Render.com using `DATABASE_URL` and `SESSION_SECRET` environment variables.

## Updated Project Structure
```
.
├── app.js                     # Updated: registers movies, reviews, and members routes
│                              # and configures PostgreSQL sessions + Render settings
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── reviewController.js    # Added: review creation + movie linking logic
│   ├── memberController.js    # Added: public user search and profile logic
├── middlewares/
│   ├── auth.js
│   ├── error-handler.js
│   ├── locals.js              # Updated: exposes auth state + user to all views
│   └── upload.js
├── models/
│   ├── User.js                # Updated: username search + public lookup
│   ├── Image.js
│   ├── Movie.js               # Added: movie creation, lookup, search, listing
│   ├── Review.js              # Added: review creation, homepage + user queries
├── public/
│   ├── css/
│   │   └── style.css          # Updated: CinemaNuts branding + homepage styling
│   ├── js/
│   │   └── main.js
├── routes/
│   ├── auth.js
│   ├── index.js               # Updated: homepage random reviews
│   ├── user.js
│   ├── movies.js              # Added: movie list, search, detail routes
│   ├── reviews.js             # Added: review submission routes
│   ├── members.js             # Added: user discovery routes
├── scripts/
│   └── init-db.js             # Updated: creates movies and reviews tables
└── views/
    ├── partials/
    │   ├── header.ejs         # Updated: nav, global search bar
    │   ├── footer.ejs
    │   ├── flash-message.ejs
    │   └── form-errors.ejs
    ├── auth/
    ├── user/
    ├── movies/
    │   ├── index.ejs          # Added: movie list + search UI
    │   └── show.ejs           # Added: movie detail + reviews
    ├── reviews/
    │   └── new.ejs            # Added: review submission form
    └── members/
        ├── index.ejs          # Added: user search page
        └── show.ejs           # Added: public user review page

```

## Team Responsibilities

- **Backend & Database:** Authentication, PostgreSQL models, review creation logic.
- **Frontend & Views:** EJS templates, CSS styling, navigation, movies & reviews UI.
- **DevOps / Deployment:** Environment configuration, Render deployment, database initialization.
