# 🏠 Airbnb Project (MERN Stack)

A full-stack Airbnb-inspired web application built using **Node.js, Express, MongoDB, and EJS**.  
The project allows users to create, browse, and manage property listings with authentication and image uploads.

---

## 🚀 Features
- 🔐 User authentication with **Passport.js** (Local strategy)  
- 🏡 Create, edit, and delete property listings  
- 🖼 Upload property images using **Multer + Cloudinary**  
- 📑 Form validation with **Joi**  
- ⚡ Flash messages & session handling with **connect-flash**  
- 📦 MongoDB & Mongoose ORM integration  
- 🎨 Dynamic views using **EJS + EJS-Mate** templating engine  
- 🗂 Organized MVC folder structure (controllers, routes, models, views)  

---

## 🛠 Tech Stack
- **Frontend:** EJS, Bootstrap/Tailwind
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Atlas or local)  
- **Authentication:** Passport.js (Local + Sessions)  
- **Image Uploads:** Multer + Cloudinary  
- **Other Tools:** dotenv, connect-flash, express-session, method-override  

---

## 📂 Project Structure
MajorProject/
│── controllers/        # Route controllers (business logic)
│── init/               # Database initialization / seed files
│── models/             # Mongoose models (User, Listing, etc.)
│── public/             # Static assets (CSS, JS, images)
│── routes/             # Express route handlers
│── uploads/            # Temporary uploads before Cloudinary
│── utils/              # Utility functions (Cloudinary config, helpers)
│── views/              # EJS templates
│── app.js              # Main server entry point
│── cloudConfig.js      # Cloudinary configuration
│── middleware.js       # Custom middlewares (auth, validation)
│── schema.js           # Joi validation schemas
│── .env                # Environment variables

