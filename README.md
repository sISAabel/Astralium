# 🌌 Astralium

A gamified web platform for discovering, tracking, and logging astronomical phenomena.

---

## 🧠 Overview

Astralium is a fullstack web application that allows users to explore astronomical events such as eclipses, meteor showers, and planetary alignments.

Users can create an account, log in, and track their participation in events, with future plans to include gamification through a points and rewards system.

---

## 🚀 Features

- 🔭 Browse astronomical events
- 📅 View detailed event information
- 👤 User authentication (register & login)
- 🔐 Protected routes with JWT
- ⭐ Attend / track events
- 🎯 Scalable structure for gamification system

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express
- MySQL
- JWT Authentication
- dotenv

### Frontend
- Angular
- CSS (custom styling)

### Tools
- Postman (API testing)
- Git & GitHub

---

## 📁 Project Structure
astralium/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── routes/
│ ├── middlewares/
│ └── app.js
│
├── frontend/
│ ├── src/
│ ├── app/
│ └── angular.json
│
└── README.md

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/astralium.git
cd astralium
```

### 2. Backend Setup

```bash
cd backend
npm install
```
- Create a .env file:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=astralium
JWT_SECRET=your_secret
```

- Run the server:
```bash
npm run dev
```
### 3. Frontend setup

```bash
cd frontend
npm install
ng serve
```

- Open in browser:

```bash
http://localhost:4200
```

---

## 🔐 Authentication

- Astralium uses JWT-based authentication.

- After login, include the token in your requests:

```bash
Authorization: Bearer YOUR_TOKEN
```

---

## 📡 API Endpoints

- Events
  -- GET /api/events → Get all events
  -- GET /api/events/:id → Get event details
  -- POST /api/events → Create event

- Users
  -- POST /api/users/register → Register
  -- POST /api/users/login → Login

- Attendance
  -- POST /api/events/attend → Attend event

---

## 🎯 Current Status

### ✅ MVP functional
### 🚧 In active development

---

## 🧩 Future Improvements

- 📍 Location-based visibility system to determine if events are observable from the user's area
- 🏆 Points and rewards system for attending and logging astronomical events
- 🔎 Advanced filters by event type, date, and visibility
- 🌐 Integration with external astronomy APIs
- 🗓️ Personal event tracking and observation history

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Author

**Sara Rodríguez**

- QA Automation Engineer with experience in Selenium, Playwright, and API testing  
- Background in web development (Angular, Node.js, SQL)  
- Currently building fullstack projects and expanding into mobile development  

🔗 GitHub: [sISAabel](https://github.com/sISAabel)  
📫 Contact: sisabel24@icloud.com

---