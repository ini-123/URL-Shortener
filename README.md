# URL-Shortener

A full-stack URL shortening application that allows users to create shortened links, manage their links, and monitor how many times each shortened link has been accessed.

The project consists of:

* **Frontend:** React
* **Backend:** Node.js + Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** JWT
* **API Testing:** Postman

---

# 1. Project Features

The application will allow users to:

* Register an account
* Log in
* Authenticate using JWT
* Create shortened URLs
* Validate submitted URLs
* Generate unique short codes
* Copy shortened URLs
* Redirect users from short URLs to the original URLs
* Track the number of clicks on each URL
* View all URLs created by the logged-in user
* View individual URL information
* Delete shortened URLs
* Search/filter URLs from the frontend
* View URL statistics
* Protect authenticated routes
* Apply rate limiting
* Handle errors consistently

---

# 2. Complete Project Structure

```text
url-shortener/
│
├── README.md
├── .gitignore
│
├── backend/
│   ├── package.json
│   ├── .env
│   │
│   └── src/
│       ├── app.js
│       │
│       ├── config/
│       │   └── database.js
│       │
│       ├── models/
│       │   ├── User.js
│       │   └── Url.js
│       │
│       ├── controllers/
│       │   ├── authController.js
│       │   └── urlController.js
│       │
│       ├── routes/
│       │   ├── authRoutes.js
│       │   └── urlRoutes.js
│       │
│       ├── middleware/
│       │   ├── authMiddleware.js
│       │   ├── errorMiddleware.js
│       │   ├── validateMiddleware.js
│       │   └── rateLimiter.js
│       │
│       ├── services/
│       │   └── urlService.js
│       │
│       ├── utils/
│       │   ├── generateShortCode.js
│       │   └── response.js
│       │
│       └── validations/
│           ├── authValidation.js
│           └── urlValidation.js
│
├── frontend/
│   ├── package.json
│   ├── .env
│   │
│   ├── public/
│   │   └── favicon.ico
│   │
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       │
│       ├── assets/
│       │   ├── logo.svg
│       │   └── illustrations/
│       │       ├── hero.svg
│       │       ├── login.svg
│       │       └── not-found.svg
│       │
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Button.jsx
│       │   ├── Input.jsx
│       │   ├── LoadingSpinner.jsx
│       │   ├── ErrorMessage.jsx
│       │   ├── SuccessMessage.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── StatsCard.jsx
│       │   ├── UrlCard.jsx
│       │   ├── UrlTable.jsx
│       │   ├── SearchBar.jsx
│       │   ├── Pagination.jsx
│       │   └── EmptyState.jsx
│       │
│       ├── pages/
│       │   ├── Landing.jsx
│       │   ├── About.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Dashboard.jsx
│       │   ├── CreateLink.jsx
│       │   ├── MyLinks.jsx
│       │   ├── LinkStats.jsx
│       │   └── NotFound.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── authService.js
│       │   └── urlService.js
│       │
│       ├── context/
│       │   └── AuthContext.jsx
│       │
│       ├── hooks/
│       │   ├── useAuth.js
│       │   └── useFetch.js
│       │
│       └── utils/
│           ├── formatDate.js
│           ├── copyToClipboard.js
│           └── validation.js
│
└── docs/
    ├── API.md
    └── screenshots/
        ├── landing.png
        ├── login.png
        ├── register.png
        ├── dashboard.png
        ├── create-link.png
        ├── my-links.png
        └── statistics.png
```

---

# 3. Backend Architecture

The backend follows this general architecture:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
MongoDB
   ↓
Response
```

Each layer has a specific responsibility.

---

# 4. Backend Files

## `app.js`

The main Express application.

Responsibilities:

* Create Express application
* Enable JSON parsing
* Enable CORS
* Register routes
* Register middleware
* Register error handler
* Register short URL redirect
* Start the server

Example route structure:

```text
/api/auth
/api/urls
/:shortCode
```

---

## `config/database.js`

Responsible for connecting the backend to MongoDB.

Responsibilities:

* Connect using Mongoose
* Read MongoDB URI from `.env`
* Handle connection errors
* Confirm successful database connection

---

# 5. Database Models

## `models/User.js`

Stores registered users.

Example structure:

```js
{
  name,
  email,
  password,
  createdAt,
  updatedAt
}
```

Passwords must never be stored as plain text.

The password should be hashed before being stored.

---

## `models/Url.js`

Stores shortened URLs.

Example:

```js
{
  originalUrl,
  shortCode,
  user,
  clicks,
  createdAt,
  updatedAt
}
```

### Field definitions

| Field         | Purpose                               |
| ------------- | ------------------------------------- |
| `originalUrl` | Original long URL                     |
| `shortCode`   | Unique shortened identifier           |
| `user`        | User who created the URL              |
| `clicks`      | Number of times the link was accessed |
| `createdAt`   | Creation date                         |
| `updatedAt`   | Last update date                      |

---

# 6. Authentication

Authentication uses JWT.

### Registration

```text
User
 ↓
Register
 ↓
Validate information
 ↓
Hash password
 ↓
Save User
 ↓
Return account/token
```

### Login

```text
User
 ↓
Login
 ↓
Find user
 ↓
Compare password
 ↓
Generate JWT
 ↓
Return token
```

### Protected request

```text
Frontend
 ↓
JWT
 ↓
authMiddleware
 ↓
Verify token
 ↓
req.user
 ↓
Controller
```

---

# 7. URL Shortening System

The main URL shortening flow is:

```text
User enters URL
       ↓
Frontend
       ↓
POST /api/urls
       ↓
URL validation
       ↓
Authentication
       ↓
urlController
       ↓
urlService
       ↓
generateShortCode
       ↓
Check code uniqueness
       ↓
Save Url
       ↓
Return short URL
```

Example:

```text
Original:

https://example.com/products/something/very-long-url
```

becomes:

```text
https://yourdomain.com/aB72xK
```

---

# 8. Click Tracking

When somebody opens:

```text
https://yourdomain.com/aB72xK
```

the backend performs:

```text
GET /aB72xK
       ↓
Find shortCode
       ↓
Increment clicks
       ↓
Get originalUrl
       ↓
Redirect user
```

The click count changes:

```text
0 → 1 → 2 → 3 → 4 → ...
```

MongoDB's `$inc` operation should be used to increment the count.

---

# 9. Backend Controllers

## `authController.js`

Handles:

* Register
* Login
* Authentication-related responses

---

## `urlController.js`

Handles:

* Create URL
* Get user's URLs
* Get individual URL
* Delete URL
* Redirect short URL
* Trigger click tracking

The controller handles HTTP requests and responses.

The business logic belongs in `urlService.js`.

---

# 10. URL Service

## `services/urlService.js`

This is the core URL business logic.

Responsibilities:

* Create shortened URL
* Generate/check short codes
* Find user's URLs
* Find individual URLs
* Track clicks
* Delete URLs

The service communicates with the `Url` model.

---

# 11. Utilities

## `generateShortCode.js`

Generates a unique short identifier.

Example:

```text
aB72xK
```

The generated code must be checked against the database to ensure that it is not already being used.

---

## `response.js`

Provides a consistent API response format.

Example success:

```json
{
  "success": true,
  "message": "URL created successfully",
  "data": {}
}
```

Example error:

```json
{
  "success": false,
  "message": "URL not found"
}
```

---

# 12. Validation

## `authValidation.js`

Validates:

* Name
* Email
* Password
* Required authentication fields

---

## `urlValidation.js`

Validates:

* URL exists
* URL has a valid format
* URL uses an accepted protocol
* Other URL-specific rules

Example:

```text
https://google.com       ✅
https://example.com/a    ✅
hello                    ❌
not-a-url                ❌
```

---

# 13. Middleware

## `authMiddleware.js`

Protects routes that require authentication.

---

## `validateMiddleware.js`

Runs the validation rules against incoming requests.

---

## `rateLimiter.js`

Limits excessive requests.

This helps protect endpoints from abuse and excessive traffic.

---

## `errorMiddleware.js`

Provides centralized error handling.

Example:

```text
Controller error
      ↓
errorMiddleware
      ↓
Consistent JSON response
```

---

# 14. Backend API Routes

## Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

## URL Management

```text
POST   /api/urls
GET    /api/urls
GET    /api/urls/:id
DELETE /api/urls/:id
```

## Short URL Redirect

```text
GET /:shortCode
```

The redirect route is separate from the API routes.

---

# 15. Frontend Architecture

The frontend follows:

```text
Pages
  ↓
Components
  ↓
Services
  ↓
API
  ↓
Backend
```

React handles the user interface while the backend handles authentication, URL processing, database operations, and redirects.

---

# 16. Frontend Pages

## `Landing.jsx`

Public homepage.

Contains:

* Application introduction
* URL shortening entry point
* Call-to-action
* Navigation

---

## `About.jsx`

Explains:

* What the application does
* How URL shortening works
* Main features

---

## `Login.jsx`

Allows existing users to log in.

Flow:

```text
Email
Password
 ↓
authService.login()
 ↓
Backend
 ↓
JWT
 ↓
AuthContext
 ↓
Dashboard
```

---

## `Register.jsx`

Allows new users to create an account.

---

## `Dashboard.jsx`

Main authenticated home page.

Displays information such as:

* Total links
* Total clicks
* Recent links
* Quick create-link action

---

## `CreateLink.jsx`

Allows the user to enter a long URL and create a shortened URL.

Example:

```text
Original URL
[ https://example.com/very-long-url ]

[ Shorten URL ]

Result:

https://yourdomain.com/aB72xK
```

---

## `MyLinks.jsx`

Displays URLs belonging to the logged-in user.

Possible information:

```text
Original URL
Short URL
Clicks
Date Created
Actions
```

Actions can include:

* Copy
* View statistics
* Delete

---

## `LinkStats.jsx`
