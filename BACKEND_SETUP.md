# Backend Setup Guide

## Quick Start (5 minutes)

### 1. Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Create `.env` file
```bash
cp .env.example .env
```

### 3. Update `.env` with your values
```env
# MongoDB (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/campus-lost-found

# JWT Secret (from step 1)
JWT_SECRET=your-generated-secret

# Cloudinary (get from cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=8080
NODE_ENV=development
```

### 4. Install dependencies
```bash
pnpm install
```

### 5. Start MongoDB
```bash
# Local
mongod

# Or MongoDB Atlas (update MONGODB_URI in .env)
```

### 6. Run development server
```bash
pnpm dev
```

Server running at: `http://localhost:8080/api`

---

## Getting Cloudinary Credentials

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to Dashboard
4. Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
5. Add to `.env`

---

## Testing the API

### Option 1: Postman (Recommended)
1. Open Postman
2. Import `Campus-Lost-Found-API.postman_collection.json`
3. Set `base_url` variable to `http://localhost:8080/api`
4. Start testing!

### Option 2: cURL

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@college.edu",
    "phone": "1234567890",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@college.edu",
    "password": "password123"
  }'
```

Copy the token from response and use in subsequent requests:

```bash
curl -X GET http://localhost:8080/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Create Admin User

1. Register a normal user
2. Update in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@college.edu" },
  { $set: { role: "admin" } }
)
```

Or use Compass/Atlas UI to update the `role` field to `"admin"`.

---

## File Structure

```
server/
├── config/                    # Configuration files
│   ├── db.ts                 # MongoDB connection
│   └── passport.ts           # JWT authentication
├── controllers/               # Business logic
│   ├── auth.controller.ts
│   ├── lost.controller.ts
│   ├── found.controller.ts
│   ├── claim.controller.ts
│   └── admin.controller.ts
├── models/                    # Database schemas
│   ├── User.ts
│   ├── LostItem.ts
│   ├── FoundItem.ts
│   └── Claim.ts
├── routes/                    # API endpoints
│   ├── auth.routes.ts
│   ├── lost.routes.ts
│   ├── found.routes.ts
│   ├── claim.routes.ts
│   └── admin.routes.ts
├── middleware/                # Middleware
│   ├── auth.ts               # JWT & role-based access
│   └── errorHandler.ts       # Global error handling
├── utils/                     # Utilities
│   ├── cloudinary.ts         # Image uploads
│   └── validators.ts         # Input validation
├── app.ts                    # Express app config
└── index.ts                  # Server entry point
```

---

## API Features

✅ **Authentication**
- User registration & login
- JWT token-based auth
- Profile management

✅ **Lost Items**
- Report lost items with images
- View all/personal lost items
- Edit & delete items
- Pagination support

✅ **Found Items**
- Report found items with images
- Storage location tracking
- Edit & delete items
- Pagination support

✅ **Claims**
- Create claims for items
- Update claim status
- Track claim history

✅ **Admin Features**
- Approve/reject items
- Mark items as returned
- System statistics
- **Smart matching** (AI-powered item matching)

✅ **Smart Matching Algorithm**
- Category matching: +40 pts
- Location similarity: +30 pts
- Description overlap: +20 pts
- Date proximity: +10 pts
- Shows top 5 matches

---

## Troubleshooting

**MongoDB Connection Error**
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- For Atlas, ensure IP whitelist includes your IP

**Cloudinary Upload Fails**
- Check credentials in `.env`
- Ensure file < 5MB
- Supported formats: JPEG, PNG, GIF, WebP

**JWT Errors**
- Token expired? Login again to get new token
- Check token format: `Authorization: Bearer {token}`
- Ensure `JWT_SECRET` is set

**Port Already in Use**
- Change `PORT` in `.env`
- Or kill process: `lsof -ti:8080 | xargs kill -9`

---

## Environment Variables Checklist

- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `JWT_SECRET` - Generated secret key
- [ ] `CLOUDINARY_CLOUD_NAME` - From Cloudinary
- [ ] `CLOUDINARY_API_KEY` - From Cloudinary
- [ ] `CLOUDINARY_API_SECRET` - From Cloudinary
- [ ] `PORT` - Server port (default: 8080)
- [ ] `NODE_ENV` - development/production
- [ ] `CORS_ORIGIN` - Allowed origins

---

## Next Steps

1. ✅ Setup `.env` file
2. ✅ Start MongoDB
3. ✅ Run `pnpm dev`
4. ✅ Test with Postman
5. ✅ Create admin user
6. ✅ Test admin features

---

## Support

- API Documentation: `API_DOCUMENTATION.md`
- Postman Collection: `Campus-Lost-Found-API.postman_collection.json`
- Code: Check `server/` folder

Enjoy! 🎉
