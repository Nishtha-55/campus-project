# Campus Lost & Found Portal - API Documentation

## Overview

Complete production-ready Node.js/Express API for the Campus Lost & Found Portal with MongoDB, Passport.js JWT authentication, Cloudinary integration, and smart item matching.

## Tech Stack

- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: Passport.js (JWT Strategy)
- **File Upload**: Multer + Cloudinary
- **Validation**: Express Validator
- **Security**: Bcryptjs for password hashing
- **CORS**: Enabled for cross-origin requests

## Project Structure

```
server/
├── config/
│   ├── db.ts                 # MongoDB connection
│   └── passport.ts           # JWT strategy configuration
├── controllers/
│   ├── auth.controller.ts    # Authentication logic
│   ├── lost.controller.ts    # Lost items management
│   ├── found.controller.ts   # Found items management
│   ├── claim.controller.ts   # Claims management
│   └── admin.controller.ts   # Admin & smart matching
├── models/
│   ├── User.ts               # User schema
│   ├── LostItem.ts           # Lost item schema
│   ├── FoundItem.ts          # Found item schema
│   └── Claim.ts              # Claim schema
├── routes/
│   ├── auth.routes.ts        # Auth endpoints
│   ├── lost.routes.ts        # Lost item endpoints
│   ├── found.routes.ts       # Found item endpoints
│   ├── claim.routes.ts       # Claim endpoints
│   └── admin.routes.ts       # Admin endpoints
├── middleware/
│   ├── auth.ts               # JWT authentication
│   └── errorHandler.ts       # Global error handling
├── utils/
│   ├── cloudinary.ts         # Image upload to Cloudinary
│   └── validators.ts         # Input validation
├── app.ts                    # Express app configuration
├── index.ts                  # Server entry point
└── node-build.ts             # Binary build configuration
```

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required Variables:**

```
# MongoDB
MONGODB_URI=mongodb://localhost:27017/campus-lost-found

# JWT (Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=your-generated-secret-key

# Cloudinary (Get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (change MONGODB_URI in .env)
```

### 4. Run Development Server

```bash
pnpm dev
```

Server will run at `http://localhost:8080`

## API Endpoints

### Base URL
```
http://localhost:8080/api
```

---

## Authentication Module

### POST `/auth/register`
Register a new user.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@college.edu",
  "phone": "1234567890",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "role": "user"
  }
}
```

---

### POST `/auth/login`
Login and receive JWT token.

**Request:**
```json
{
  "email": "john@college.edu",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "role": "user"
  }
}
```

---

### GET `/auth/profile`
Get authenticated user's profile (Protected).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "role": "user",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### PUT `/auth/profile`
Update user profile (Protected).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "name": "John Updated",
  "phone": "9876543210"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Updated",
    "email": "john@college.edu",
    "phone": "9876543210",
    "role": "user"
  }
}
```

---

## Lost Items Module

### POST `/lost`
Report a lost item (Protected).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
```
title: "Black MacBook Pro"
category: "Electronics"  (Electronics|Books|Wallet|Keys|Others)
description: "Black MacBook Pro 13 inch with silver keyboard"
location_lost: "Library, 3rd Floor"
date_lost: "2024-01-15"
image: <file>  (optional)
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lost item reported successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Black MacBook Pro",
    "category": "Electronics",
    "description": "...",
    "location_lost": "Library, 3rd Floor",
    "date_lost": "2024-01-15T00:00:00Z",
    "image_url": "https://res.cloudinary.com/...",
    "user_id": "507f1f77bcf86cd799439011",
    "status": "pending",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### GET `/lost`
Get all approved lost items (Public).

**Query Parameters:**
- `page`: 1-based page number (default: 1)
- `limit`: Items per page (default: 10)
- `status`: Filter by status (default: "approved")

**Response (200):**
```json
{
  "success": true,
  "data": [ /* array of lost items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

---

### GET `/lost/my-items`
Get authenticated user's lost items (Protected).

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `page`: 1-based page number (default: 1)
- `limit`: Items per page (default: 10)

---

### GET `/lost/:id`
Get specific lost item by ID (Public).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Black MacBook Pro",
    /* ... full item data ... */
    "user_id": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@college.edu",
      "phone": "1234567890"
    }
  }
}
```

---

### PUT `/lost/:id`
Update lost item (Protected - Owner or Admin).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:** (same as POST, all optional)

---

### DELETE `/lost/:id`
Delete lost item (Protected - Owner or Admin).

---

## Found Items Module

### POST `/found`
Report a found item (Protected).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Form Data:**
```
title: "Physics Textbook"
category: "Books"  (Electronics|Books|Wallet|Keys|Others)
description: "Physics textbook found near cafeteria"
location_found: "Cafeteria Area"
date_found: "2024-01-14"
stored_at: "library_desk"  (security_office|library_desk|reception|lost_and_found)
image: <file>  (optional)
```

---

### GET `/found`
Get all approved found items (Public).

**Query Parameters:** (same as lost items)

---

### GET `/found/my-items`
Get authenticated user's found items (Protected).

---

### GET `/found/:id`
Get specific found item (Public).

---

### PUT `/found/:id`
Update found item (Protected - Owner or Admin).

---

### DELETE `/found/:id`
Delete found item (Protected - Owner or Admin).

---

## Claims Module

### POST `/claims`
Create a claim for a lost/found item (Protected).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "item_id": "507f1f77bcf86cd799439012",
  "item_type": "found",  (lost|found)
  "claim_message": "This is my black MacBook that I lost last week. It has a crack on the left side."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Claim created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "user_id": "507f1f77bcf86cd799439011",
    "item_id": "507f1f77bcf86cd799439012",
    "item_type": "FoundItem",
    "claim_message": "...",
    "claim_status": "pending",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### GET `/claims/user`
Get authenticated user's claims (Protected).

**Query Parameters:**
- `page`: 1-based page number (default: 1)
- `limit`: Items per page (default: 10)

---

### GET `/claims/item/:itemId`
Get all claims for a specific item (Public).

---

### PUT `/claims/:id`
Update claim status (Protected - Item owner or Admin).

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request:**
```json
{
  "claim_status": "approved"  (pending|approved|rejected)
}
```

---

### DELETE `/claims/:id`
Delete a claim (Protected - Claim owner or Admin).

---

## Admin Module

All admin routes require **Admin role** and authentication.

### GET `/admin/statistics`
Get system statistics (Admin Only).

**Headers:**
```
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalLostItems": 42,
    "totalFoundItems": 35,
    "totalClaims": 28,
    "lostItemsByStatus": {
      "pending": 5,
      "approved": 30,
      "claimed": 7
    },
    "foundItemsByStatus": {
      "pending": 3,
      "approved": 28,
      "returned": 4
    },
    "claimsByStatus": {
      "pending": 10,
      "approved": 15,
      "rejected": 3
    },
    "itemsByCategory": [
      { "_id": "Electronics", "count": 35 },
      { "_id": "Books", "count": 20 },
      { "_id": "Wallet", "count": 15 },
      { "_id": "Keys", "count": 12 },
      { "_id": "Others", "count": 10 }
    ]
  }
}
```

---

### GET `/admin/pending-items`
Get pending items awaiting approval (Admin Only).

**Query Parameters:**
- `page`: 1-based page number (default: 1)
- `limit`: Items per page (default: 10)

---

### PUT `/admin/approve/:id`
Approve a pending item (Admin Only).

**Query Parameters:**
- `itemType`: "lost" or "found"

**Example:**
```
PUT /admin/approve/507f1f77bcf86cd799439012?itemType=lost
```

---

### PUT `/admin/reject/:id`
Reject and delete a pending item (Admin Only).

**Query Parameters:**
- `itemType`: "lost" or "found"

---

### PUT `/admin/mark-returned/:id`
Mark item as claimed/returned (Admin Only).

**Query Parameters:**
- `itemType`: "lost" or "found"

---

### GET `/admin/match/:lostItemId`
Smart matching system - Find possible matches for a lost item (Admin Only).

**Response (200):**
```json
{
  "success": true,
  "data": {
    "lostItem": { /* lost item data */ },
    "possibleMatches": [
      {
        "foundItem": { /* found item data */ },
        "matchScore": 85  (out of 100)
      },
      {
        "foundItem": { /* found item data */ },
        "matchScore": 72
      }
    ],
    "totalMatches": 5
  }
}
```

**Matching Algorithm:**
- Category match: +40 points
- Location similarity: +30 points
- Title/Description keyword overlap: +20 points
- Date difference < 3 days: +10 points
- **Minimum score to show: 20 points**

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Missing/invalid token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `500` - Server Error

**Example Error Response:**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiration:** 7 days

---

## File Upload

Images are uploaded to Cloudinary. Maximum file size: 5MB.

Supported formats:
- JPEG
- PNG
- GIF
- WebP

---

## Validation Rules

**User Registration:**
- Name: 2+ characters
- Email: Valid email format, unique
- Phone: 10 digits
- Password: 6+ characters

**Lost/Found Items:**
- Title: Required
- Category: One of (Electronics, Books, Wallet, Keys, Others)
- Description: 10+ characters
- Location: Required
- Date: Valid ISO date

**Claims:**
- Claim message: 10+ characters minimum

---

## Testing with Postman

1. Import `Campus-Lost-Found-API.postman_collection.json` into Postman
2. Set variables:
   - `base_url`: `http://localhost:8080/api`
   - `token`: JWT token from login
   - `admin_token`: Admin user JWT token
3. Test endpoints in sequence

---

## Security Best Practices

✅ **Implemented:**
- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control (RBAC)
- Input validation with express-validator
- CORS enabled
- Environment variables for sensitive data
- Mongoose schema validation

---

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: "user" | "admin",
  createdAt: Date,
  updatedAt: Date
}
```

### LostItem
```javascript
{
  title: String,
  category: String,
  description: String,
  location_lost: String,
  date_lost: Date,
  image_url: String,
  user_id: ObjectId (ref: User),
  status: "pending" | "approved" | "claimed",
  createdAt: Date,
  updatedAt: Date
}
```

### FoundItem
```javascript
{
  title: String,
  category: String,
  description: String,
  location_found: String,
  date_found: Date,
  image_url: String,
  stored_at: String,
  finder_user_id: ObjectId (ref: User),
  status: "pending" | "approved" | "returned",
  createdAt: Date,
  updatedAt: Date
}
```

### Claim
```javascript
{
  user_id: ObjectId (ref: User),
  item_id: ObjectId,
  item_type: "LostItem" | "FoundItem",
  claim_message: String,
  claim_status: "pending" | "approved" | "rejected",
  createdAt: Date,
  updatedAt: Date
}
```

---

## Support

For issues or questions, contact the development team or check the GitHub repository.

Generated JWT Secret: Use the one in `.env`

Last Updated: January 2024
