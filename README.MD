# CasaHaven 🏡

**CasaHaven** is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) homestay booking platform that connects hosts with guests. Hosts can list their properties for rent, while guests can browse, book, and manage their stays.

---

## 🚀 Features

### 🔐 User Authentication & Authorization
- Secure Sign-up/Login for **Hosts** and **Guests**
- **JWT-based** authentication and session management
- Role-based access control with separate **Dashboards**

---

### 🏠 Host Functionality
- Add property listings (title, description, price, location, amenities, images)
- Approve or reject booking requests
- Track earnings and view transaction history
- Communicate with guests through an integrated messaging system
- Respond to reviews and ratings

---

### 🌍 Guest Functionality
- Browse homestays by location, budget, and amenities
- Book stays securely using integrated payment gateway
- Manage booking history and upcoming stays
- Add properties to a **Wishlist**
- Leave reviews and rate hosts after the stay

---

### 🛠️ Admin Panel
- Monitor and manage all listings, users, and bookings
- Handle disputes, feedback, and reviews
- Oversee payment issues and platform activity

---

## 🧱 Technology Stack

### 🖥️ Frontend
- **React.js** for UI development
- **React Router** for client-side routing
- **Redux** or **Context API** for state management
- **Tailwind CSS** or **Material-UI** for responsive, modern styling

### 🌐 Backend
- **Node.js** & **Express.js** for server and RESTful APIs
- **JWT** for user authentication and session management
- **bcrypt.js** for secure password hashing
- **Nodemailer** for sending booking confirmations and notifications

### 🗃️ Database
- **MongoDB Atlas** for cloud database storage
- Schemas:
  - **User** (name, email, password, role)
  - **Property** (title, description, location, price, images)
  - **Booking** (guest ID, host ID, status, payment, dates)
  - **Reviews** and **Messages**



---

## 📂 Project Structure (MERN)

