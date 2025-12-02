📘 README.md — Campus Lost & Found Portal


🎒 Campus Lost & Found Portal
A full-stack MERN application designed to help students easily report, search, and recover lost items on campus.
Includes secure authentication, image uploading, admin verification, and an intelligent matching system to connect lost and found reports efficiently.


🚀 Tech Stack

Frontend

React.js
Redux Toolkit
React Router
Tailwind CSS
Framer Motion
Axios

Backend

Node.js
Express.js
MongoDB + Mongoose
Passport.js (JWT Strategy)
Multer
Cloudinary

📌 Key Features

👤 User Features
Register/Login with JWT authentication
Report lost items with images
Report found items with images
Browse all found items
Search & filter by category, location, date, status
Claim items
View status of claims
Smart matching that suggests possible found items based on similarity

🛠 Admin Features
Approve / Reject items
Review claims
Manage users
Dashboard with statistics

🖼 Image Handling
Image upload using Multer
Stored on Cloudinary
Fast CDN-based delivery

📁 Project Structure
Backend
server/
│── config/
│── controllers/
│── middlewares/
│── models/
│── routes/
│── utils/
│── server.js
Frontend
client/
│── src/
│   ├── pages/
│   ├── components/
│   ├── store/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│── public/
│── index.html
🔧 Installation & Setup

1️⃣ Clone the repository
git clone https://github.com/your-username/campus-lostfound-frontend.git
cd campus-lostfound-frontend

🖥 Frontend Setup
Install dependencies:
npm install
Create environment file:
VITE_API_URL=http://localhost:5000/api
Start frontend:
npm run dev

🛠 Backend Setup
Install dependencies:
npm install
Environment file:
MONGO_URI=<your MongoDB Atlas URI>
JWT_SECRET=<your secret>
CLOUDINARY_NAME=<your cloud name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
Start backend:
npm run start

🔗 API Endpoints Overview
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login & get JWT
Lost Items
Method	Endpoint	Description
POST	/api/lost	Submit lost item
GET	/api/lost	Get all lost items
GET	/api/lost/:id	Get one item
Found Items
| POST | /api/found
| GET | /api/found
Claims
| POST | /api/claims
| GET | /api/claims/user
Admin
| PUT | /api/admin/approve-item/:id
| PUT | /api/admin/reject-item/:id
| GET | /api/admin/statistics

🤖 Matching Algorithm
The system matches Lost & Found items based on:
Category similarity
Location distance
Description keywords
Date correlation
Generates a match score and suggests likely matches.

🎨 UI/UX
Tailwind for styling
Framer Motion for animations
Minimal, modern, responsive layout
Optimized for mobile + desktop

📈 Future Enhancements
AI-based visual matching
QR code tagging for items
Push notifications
Chat between finder & loser
Blockchain-based verification


👨‍💻 Author
Nishtha Srivastava
MERN Developer | UI/UX Enthusiast


⭐ Support the Project
If you like the project, don’t forget to ⭐ the repository!

