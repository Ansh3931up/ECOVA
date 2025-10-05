# 🌱 ECOVA – Environmental Club Website

ECOVA is the official website for our college’s **Environmental Club**, built to spread awareness, showcase initiatives, and engage students in sustainability activities.
👉 Live Demo: [ecova.vercel.app](https://ecova.vercel.app)

---

## 📂 Project Structure

```
ECOVA/
├── client/        # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/        # Backend (Node.js/Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   └── server.js
├── .gitignore
└── README.md
```

---

## 🚀 Features

* Club information and initiatives
* Event announcements & activities
* Member registration and login
* Awareness blogs and resources
* Clean UI with responsive design

---

## 🛠️ Tech Stack

**Frontend:** React, HTML, CSS, JavaScript
**Backend:** Node.js, Express.js
**Database:** MongoDB
**Hosting:** Vercel (Frontend), Render/Heroku (Backend)

---

## ⚙️ Setup Instructions

1. Clone the repo

   ```bash
   git clone https://github.com/Ansh3931up/ECOVA.git
   cd ECOVA
   ```

2. Install dependencies

   * For frontend:

     ```bash
     cd client
     npm install
     npm start
     ```
   * For backend:

     ```bash
     cd server
     npm install
     npm run dev
     ```

3. Setup environment variables in `server/.env`:

   ```
   PORT=5000
   MONGO_URI=your_mongo_connection
   JWT_SECRET=your_secret_key
   ```

4. Open [http://localhost:3000](http://localhost:3000) for frontend and backend on [http://localhost:5000](http://localhost:5000).

---

## 🤝 Contribution

We welcome contributions!

* Fork the repo
* Create a feature branch
* Commit your changes
* Open a pull request

---

## 📜 License

This project is licensed under the **MIT License**.

---

### 💡 Maintained by:

**ECOVA Club, [IIIT Una]**
