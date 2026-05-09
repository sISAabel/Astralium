# 🌌 Astralium

A gamified web platform for discovering, tracking, and logging astronomical phenomena.

---

## 🧠 Overview

Astralium is a fullstack web application that allows users to explore astronomical events such as eclipses, meteor showers, and planetary alignments.

Users can create an account, log in, and track their participation in events, with future plans to include gamification through a points and rewards system.

---

## 🚀 Features

## Features

- 🔭 Browse astronomical events
- 📅 View detailed event information
- 👤 User authentication (register & login)
- 🔐 Protected routes with JWT authentication
- ⭐ Earn points through event participation
- 🛠️ Admin dashboard for event management
- ✏️ Create, edit and delete astronomical events
- 🖼️ Dynamic event image support
- 🌌 Modern responsive space-themed interface
- 🚀 Scalable architecture for future gamification features

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
<pre>
astralium/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── app.js
│
├── frontend/
│   ├── src/
│   ├── app/
│   └── angular.json
│
└── README.md
</pre>
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

### Authentication & Users

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/users | Create user |
| POST | /api/users/login | Login user |

### Events

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/events | Get all events |
| GET | /api/events/:id | Get single event |
| POST | /api/events | Create event |
| PUT | /api/events/:id | Update event |
| DELETE | /api/events/:id | Delete event |

---

## 🎯 Current Status

### ✅ MVP functional
### 🚧 In active development

---

## 🛠️ Admin Dashboard

Astralium includes a complete administrator panel that allows authorized users to manage astronomical events through a modern space-inspired interface.

---

## 🧩 Future Improvements

## Future Improvements

- 🤖 Astronomical AI assistant integration
- ❤️ Favorite events system
- 🗓️ Interactive astronomy calendar
- 🔔 Notifications for upcoming events
- 📤 Image upload support from the admin dashboard
- 📊 Analytics dashboard for users and events
- 🏆 Achievement and rewards system

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
