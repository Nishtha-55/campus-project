# API Examples & Sample Responses

## Table of Contents
1. [Authentication Examples](#authentication)
2. [Lost Items Examples](#lost-items)
3. [Found Items Examples](#found-items)
4. [Claims Examples](#claims)
5. [Admin Examples](#admin)

---

## Authentication

### Register User

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "password": "SecurePass123"
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTcwNTA0OTIwMCwiZXhwIjoxNzA1NjU0MDAwfQ.abc123xyz",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Login User

**Request:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@college.edu",
    "password": "SecurePass123"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTcwNTA0OTIwMCwiZXhwIjoxNzA1NjU0MDAwfQ.abc123xyz",
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

### Get Profile

**Request:**
```bash
curl -X GET http://localhost:8080/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "role": "user",
    "createdAt": "2024-01-15T10:32:00.000Z"
  }
}
```

---

### Update Profile

**Request:**
```bash
curl -X PUT http://localhost:8080/api/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Updated",
    "phone": "9876543210"
  }'
```

**Success Response (200):**
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

## Lost Items

### Create Lost Item

**Request (with form data including image):**
```bash
curl -X POST http://localhost:8080/api/lost \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "title=Black MacBook Pro" \
  -F "category=Electronics" \
  -F "description=Black MacBook Pro 13 inch with silver keyboard and charging cable" \
  -F "location_lost=Library, 3rd Floor" \
  -F "date_lost=2024-01-15" \
  -F "image=@/path/to/macbook.jpg"
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Lost item reported successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Black MacBook Pro",
    "category": "Electronics",
    "description": "Black MacBook Pro 13 inch with silver keyboard and charging cable",
    "location_lost": "Library, 3rd Floor",
    "date_lost": "2024-01-15T00:00:00.000Z",
    "image_url": "https://res.cloudinary.com/dxxxxx/image/upload/v1705323120/campus-lost-found/1705323120123.jpg",
    "user_id": "507f1f77bcf86cd799439011",
    "status": "pending",
    "createdAt": "2024-01-15T10:32:00.000Z",
    "updatedAt": "2024-01-15T10:32:00.000Z"
  }
}
```

---

### Get All Lost Items (with Pagination)

**Request:**
```bash
curl -X GET "http://localhost:8080/api/lost?page=1&limit=10&status=approved"
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Black MacBook Pro",
      "category": "Electronics",
      "description": "Black MacBook Pro 13 inch...",
      "location_lost": "Library, 3rd Floor",
      "date_lost": "2024-01-15T00:00:00.000Z",
      "image_url": "https://res.cloudinary.com/...",
      "user_id": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@college.edu"
      },
      "status": "approved",
      "createdAt": "2024-01-15T10:32:00.000Z",
      "updatedAt": "2024-01-15T10:45:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Blue Wallet",
      "category": "Wallet",
      "description": "Blue leather wallet with campus ID...",
      "location_lost": "Cafeteria",
      "date_lost": "2024-01-14T00:00:00.000Z",
      "image_url": "https://res.cloudinary.com/...",
      "user_id": {
        "_id": "507f1f77bcf86cd799439014",
        "name": "Jane Smith",
        "email": "jane@college.edu"
      },
      "status": "approved",
      "createdAt": "2024-01-14T15:20:00.000Z",
      "updatedAt": "2024-01-14T16:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

---

### Get Lost Item Details

**Request:**
```bash
curl -X GET http://localhost:8080/api/lost/507f1f77bcf86cd799439012
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Black MacBook Pro",
    "category": "Electronics",
    "description": "Black MacBook Pro 13 inch with silver keyboard and charging cable",
    "location_lost": "Library, 3rd Floor",
    "date_lost": "2024-01-15T00:00:00.000Z",
    "image_url": "https://res.cloudinary.com/...",
    "user_id": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@college.edu",
      "phone": "1234567890"
    },
    "status": "approved",
    "createdAt": "2024-01-15T10:32:00.000Z",
    "updatedAt": "2024-01-15T10:45:00.000Z"
  }
}
```

---

### Update Lost Item

**Request:**
```bash
curl -X PUT http://localhost:8080/api/lost/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "title=Silver MacBook Pro" \
  -F "description=Update: Found to be silver, not black"
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Lost item updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Silver MacBook Pro",
    "category": "Electronics",
    "description": "Update: Found to be silver, not black",
    "location_lost": "Library, 3rd Floor",
    "date_lost": "2024-01-15T00:00:00.000Z",
    "image_url": "https://res.cloudinary.com/...",
    "user_id": "507f1f77bcf86cd799439011",
    "status": "approved",
    "createdAt": "2024-01-15T10:32:00.000Z",
    "updatedAt": "2024-01-15T11:50:00.000Z"
  }
}
```

---

## Found Items

### Create Found Item

**Request:**
```bash
curl -X POST http://localhost:8080/api/found \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "title=Physics Textbook" \
  -F "category=Books" \
  -F "description=Physics textbook - appears to be a first edition" \
  -F "location_found=Near Cafeteria by Entrance" \
  -F "date_found=2024-01-14" \
  -F "stored_at=library_desk" \
  -F "image=@/path/to/book.jpg"
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Found item reported successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Physics Textbook",
    "category": "Books",
    "description": "Physics textbook - appears to be a first edition",
    "location_found": "Near Cafeteria by Entrance",
    "date_found": "2024-01-14T00:00:00.000Z",
    "image_url": "https://res.cloudinary.com/...",
    "stored_at": "library_desk",
    "finder_user_id": "507f1f77bcf86cd799439011",
    "status": "pending",
    "createdAt": "2024-01-14T15:20:00.000Z",
    "updatedAt": "2024-01-14T15:20:00.000Z"
  }
}
```

---

### Get All Found Items

**Request:**
```bash
curl -X GET "http://localhost:8080/api/found?page=1&limit=10&status=approved"
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "title": "Physics Textbook",
      "category": "Books",
      "location_found": "Near Cafeteria by Entrance",
      "date_found": "2024-01-14T00:00:00.000Z",
      "image_url": "https://res.cloudinary.com/...",
      "stored_at": "library_desk",
      "finder_user_id": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@college.edu"
      },
      "status": "approved",
      "createdAt": "2024-01-14T15:20:00.000Z",
      "updatedAt": "2024-01-14T16:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 35,
    "pages": 4
  }
}
```

---

## Claims

### Create Claim

**Request:**
```bash
curl -X POST http://localhost:8080/api/claims \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "item_id": "507f1f77bcf86cd799439020",
    "item_type": "found",
    "claim_message": "This is my physics textbook that I lost last Monday at the cafeteria. It has my name written on the inside cover and some blue highlighter marks on page 45."
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Claim created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439025",
    "user_id": "507f1f77bcf86cd799439011",
    "item_id": "507f1f77bcf86cd799439020",
    "item_type": "FoundItem",
    "claim_message": "This is my physics textbook that I lost last Monday at the cafeteria...",
    "claim_status": "pending",
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-15T14:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "You have already claimed this item"
}
```

---

### Get My Claims

**Request:**
```bash
curl -X GET "http://localhost:8080/api/claims/user?page=1&limit=10" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439025",
      "user_id": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@college.edu"
      },
      "item_id": "507f1f77bcf86cd799439020",
      "item_type": "FoundItem",
      "claim_message": "This is my physics textbook...",
      "claim_status": "pending",
      "createdAt": "2024-01-15T14:30:00.000Z",
      "updatedAt": "2024-01-15T14:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

---

### Update Claim Status

**Request (by item owner/admin):**
```bash
curl -X PUT http://localhost:8080/api/claims/507f1f77bcf86cd799439025 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "claim_status": "approved"
  }'
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Claim status updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439025",
    "user_id": "507f1f77bcf86cd799439011",
    "item_id": "507f1f77bcf86cd799439020",
    "item_type": "FoundItem",
    "claim_message": "This is my physics textbook...",
    "claim_status": "approved",
    "createdAt": "2024-01-15T14:30:00.000Z",
    "updatedAt": "2024-01-15T15:45:00.000Z"
  }
}
```

---

## Admin

### Get Statistics

**Request (admin only):**
```bash
curl -X GET http://localhost:8080/api/admin/statistics \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
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
      {
        "_id": "Electronics",
        "count": 35
      },
      {
        "_id": "Books",
        "count": 20
      },
      {
        "_id": "Wallet",
        "count": 15
      },
      {
        "_id": "Keys",
        "count": 12
      },
      {
        "_id": "Others",
        "count": 10
      }
    ]
  }
}
```

---

### Smart Match Lost Item

**Request:**
```bash
curl -X GET http://localhost:8080/api/admin/match/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "lostItem": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Black MacBook Pro",
      "category": "Electronics",
      "description": "Black MacBook Pro 13 inch...",
      "location_lost": "Library, 3rd Floor",
      "date_lost": "2024-01-15T00:00:00.000Z"
    },
    "possibleMatches": [
      {
        "foundItem": {
          "_id": "507f1f77bcf86cd799439030",
          "title": "Laptop Computer",
          "category": "Electronics",
          "location_found": "Library 3rd Floor",
          "date_found": "2024-01-15T00:00:00.000Z",
          "finder_user_id": {
            "name": "Jane Smith",
            "email": "jane@college.edu",
            "phone": "9876543210"
          }
        },
        "matchScore": 92
      },
      {
        "foundItem": {
          "_id": "507f1f77bcf86cd799439031",
          "title": "Black Computer",
          "category": "Electronics",
          "location_found": "Building A, Floor 3",
          "date_found": "2024-01-16T00:00:00.000Z",
          "finder_user_id": {
            "name": "Bob Johnson",
            "email": "bob@college.edu",
            "phone": "5555555555"
          }
        },
        "matchScore": 78
      }
    ],
    "totalMatches": 2
  }
}
```

**Matching Algorithm Breakdown:**
- Found item has same category (Electronics): +40 pts
- Location "Library 3rd Floor" vs "Library, 3rd Floor": ~90% match = +27 pts
- Title "Laptop Computer" vs "Black MacBook Pro": ~60% match = +12 pts
- Date difference is 0 days (< 3 days): +10 pts
- **Total Score: 89 pts** (rounded to 92)

---

### Approve Item

**Request:**
```bash
curl -X PUT "http://localhost:8080/api/admin/approve/507f1f77bcf86cd799439012?itemType=lost" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "lost item approved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Black MacBook Pro",
    "status": "approved",
    /* ... rest of item data ... */
  }
}
```

---

### Mark Item as Returned

**Request:**
```bash
curl -X PUT "http://localhost:8080/api/admin/mark-returned/507f1f77bcf86cd799439020?itemType=found" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "found item marked as returned successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Physics Textbook",
    "status": "returned",
    /* ... rest of item data ... */
  }
}
```

---

## Error Examples

### 401 - Unauthorized (Missing Token)
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 - Forbidden (Invalid Role)
```json
{
  "success": false,
  "message": "User role not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Lost item not found"
}
```

### 400 - Validation Error
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "value": "invalid-email",
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

## Headers Reference

**Required Headers for Protected Routes:**
```
Authorization: Bearer {jwt_token}
```

**For POST/PUT with JSON:**
```
Content-Type: application/json
```

**For POST/PUT with File Upload:**
```
Content-Type: multipart/form-data
```

---

## Tips for Testing

1. **Save JWT Token:** Copy token from login response
2. **Use Variables in Postman:** Set `token` variable for reuse
3. **Test Order:** Register → Login → Create item → Create claim
4. **Check Permissions:** Ensure you're using correct user for DELETE/UPDATE
5. **Admin Testing:** Create admin user in MongoDB with `role: "admin"`

Happy testing! 🚀
