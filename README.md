<div align="center">
  <h1>GYMNAZO Christian Academy</h1>
  <h3>School Management System</h3>
  <p>A comprehensive school management system designed to provide affordable and accessible quality education while streamlining administrative tasks.</p>

  <p>
    <a href="https://github.com/OpenYaji/School-Management-System-GYMNAZO/stargazers">
      <img src="https://img.shields.io/github/stars/OpenYaji/School-Management-System-GYMNAZO?style=for-the-badge&logo=github&color=f4c20d&logoColor=white" alt="GitHub Stars">
    </a>
    <a href="https://github.com/OpenYaji/School-Management-System-GYMNAZO/network/members">
      <img src="https://img.shields.io/github/forks/OpenYaji/School-Management-System-GYMNAZO?style=for-the-badge&logo=github&color=42b883&logoColor=white" alt="GitHub Forks">
    </a>
    <a href="./LICENSE">
      <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&color=3498db" alt="License">
    </a>
  </p>
</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About The Project

**GYMNAZO Christian Academy School Management System** is a modern web platform committed to the formation of values and quality education. Located at **268 Zabala St. Cor. Lualhati St. Tondo, Manila, Philippines**, the academy provides a comprehensive digital solution for managing various aspects of school operations.

### Mission Statement
> "Affordable and Accessible Quality Education"

This system integrates student information management, attendance tracking, grade management, document requests, library access, and parent-teacher communication into one centralized, user-friendly platform.

---

## ✨ Features

<table>
<tr>
<td width="33%" valign="top">

### For Students 👨‍🎓
- 📊 **Personalized Dashboard**
- 📚 **Subject & Course Viewing**
- 📅 **Event & Activity Calendar**
- 📄 **Online Document Requests**
- 📚 **Library Access** (10 Books Available)
- 💳 **Tuition Payment Portal**
- 🗣️ **Teacher Q&A Corner**
- 🌙 **Light/Dark Mode Toggle**
- 🔔 **Real-time Notifications**

</td>
<td width="33%" valign="top">

### For Administrators 💼
- 📈 **Real-time Analytics Dashboard**
- 👤 **Student & Staff Management**
- 🏫 **Academic Management**
- 📂 **Document Processing**
- 📅 **Event Management**
- 💰 **Fee & Invoice Management**
- 📚 **Library Management**
- 📋 **Comprehensive Reporting**
- ⚙️ **System Configuration**

</td>
<td width="33%" valign="top">

### For Teachers & Parents 👨‍🏫
- 📝 **Attendance Tracking**
- 💯 **Grade Management**
- 🗒️ **Assignment Management**
- 🗣️ **Q&A Corner Response**
- 📈 **Child's Progress Monitoring**
- 🔔 **Event & School Updates**
- 📬 **Direct Communication**
- 📊 **Performance Analytics**

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

This project is built with a modern, robust technology stack:

### Frontend
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend
![PHP](https://img.shields.io/badge/PHP-Native-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

### Additional Tools
- **Lucide React** - Icon library
- **React Router** - Navigation
- **JWT** - Authentication
- **bcrypt** - Password security

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: v18.x or higher
- **PHP**: v8.x or higher
- **MySQL**: v8.x or higher
- **Web Server**: Apache/Nginx (XAMPP, WAMP, etc.)
- **npm** or **yarn**

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/OpenYaji/School-Management-System-GYMNAZO.git
cd School-Management-System-GYMNAZO
```

#### 2. Backend Setup (PHP & MySQL)

**Step 1:** Move the backend folder into your web server's root directory.

```bash
# For XAMPP (Windows)
C:/xampp/htdocs/gymnazo-backend

# For XAMPP (Linux)
/opt/lampp/htdocs/gymnazo-backend
```

**Step 2:** Create a new MySQL database.

```sql
CREATE DATABASE gymnazo_db;
```

**Step 3:** Import the database schema.

```bash
mysql -u root -p gymnazo_db < database/gymnazo_db.sql
```

**Step 4:** Configure database credentials in `backend/config/database.php`.

```php
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'gymnazo_db');
define('DB_USER', 'root');
define('DB_PASS', '');
?>
```

**Step 5:** Ensure `.htaccess` is configured for clean URLs.

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php?request=$1 [QSA,L]
```

#### 3. Frontend Setup (React)

**Step 1:** Navigate to the frontend directory.

```bash
cd frontend
```

**Step 2:** Install NPM packages.

```bash
npm install
# or
yarn install
```

**Step 3:** Create and configure environment variables.

```bash
cp .env.example .env
```

Edit `.env` file:

```env
VITE_API_URL=http://localhost/gymnazo-backend/api
VITE_APP_NAME=Gymnazo Christian Academy
```

**Step 4:** Start the development server.

```bash
npm run dev
# or
yarn dev
```

#### 4. Run the Application

1. Start your **Apache** and **MySQL** server (via XAMPP/WAMP)
2. Access the application at: **http://localhost:5173**
3. Backend API endpoint: **http://localhost/gymnazo-backend/api**

---

## 🎮 Usage

### Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| **Admin** | `admin@gymnazo.edu.ph` | `admin123` |
| **Teacher** | `teacher@gymnazo.edu.ph` | `teacher123` |
| **Student** | `2025-00001` | `student123` |

⚠️ **Important:** Change all default passwords immediately after first login!

### Navigation Structure

**Public Pages:**
- 🏠 **Home** - Landing page with school information
- ℹ️ **About Us** - Mission, vision, and school details
- 📢 **Announcements** - Latest school news and updates
- 📧 **Contact Us** - Get in touch with the academy

**Student Dashboard:**
- 📊 **Dashboard** - Overview with subjects, events, and quick actions
- 📚 **Academic** - View enrolled subjects (7 Active)
- 💼 **Transaction** - Document requests and payment history
- ⚙️ **Settings** - Update profile and preferences
- 🆘 **Help Support** - FAQ and support resources

### Key Features Guide

**📄 Document Requests:**
1. Navigate to Dashboard
2. Click on "Document Request" card (0 Pending)
3. Select document type
4. Submit request
5. Track status (Pending/Approved/Ready)

**📚 Library Access:**
1. Go to "Library Access" section (10 Books Available)
2. Browse available books
3. View book details and availability

**💳 Pay Tuition:**
1. Click on "Pay Tuition" card
2. View current balance
3. Select payment method
4. Process payment

**🗣️ Teacher Q&A Corner:**
1. Access "Teacher Q&A Corner"
2. Ask questions or view responses
3. Receive direct teacher feedback

---

## 📁 Project Structure

```
School-Management-System-GYMNAZO/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Academic.jsx
│   │   │   └── Transaction.jsx
│   │   ├── services/          # API service functions
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Utility functions
│   │   ├── assets/            # Images, icons, etc.
│   │   └── App.jsx            # Main app component
│   ├── public/                # Static files
│   ├── package.json           # Dependencies
│   ├── tailwind.config.js     # Tailwind configuration
│   └── vite.config.js         # Vite configuration
│
├── backend/                    # PHP backend API
│   ├── api/                   # API endpoints
│   │   ├── auth/             # Authentication routes
│   │   ├── students/         # Student management
│   │   ├── documents/        # Document requests
│   │   └── library/          # Library management
│   ├── config/                # Configuration files
│   │   └── database.php      # Database connection
│   ├── models/                # Database models
│   ├── controllers/           # Business logic
│   ├── middleware/            # Authentication middleware
│   └── database/              # SQL schema files
│       └── gymnazo_db.sql
│
├── screenshots/               # Application screenshots
├── LICENSE                    # MIT License
└── README.md                  # This file
```

---

## 🗺️ Roadmap

### ✅ Phase 1 (Completed)
- [x] Student dashboard with personalized greeting
- [x] Document request system (0 Pending tracking)
- [x] Library management (10 Books Available)
- [x] Event calendar (3 Ongoing events)
- [x] Subject management (7 Active subjects)
- [x] Dark mode support with toggle
- [x] Teacher Q&A corner

### 🚧 Phase 2 (In Progress)
- [ ] Mobile responsive optimization
- [ ] Payment gateway integration
- [ ] Email notification system
- [ ] Parent portal access
- [ ] Advanced reporting and analytics

### 📅 Phase 3 (Planned)
- [ ] 📱 Mobile application (iOS and Android)
- [ ] 🎥 Video conferencing integration
- [ ] 🤖 AI-powered grade prediction
- [ ] 🌐 Multi-language support (Filipino/English)
- [ ] 📊 Advanced analytics dashboard
- [ ] 📱 SMS notification system
- [ ] 📜 Digital certificates generation

### 🔮 Phase 4 (Future)
- [ ] 🚌 Transportation tracking module
- [ ] 🏨 Hostel management system
- [ ] 📦 Inventory management
- [ ] 🎓 Alumni portal and networking
- [ ] 💰 Scholarship management
- [ ] 🔗 Integration with DepEd systems

See the [open issues](https://github.com/OpenYaji/School-Management-System-GYMNAZO/issues) for a full list of proposed features and known issues.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Fork** the repository
2. Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. Open a **Pull Request**

### Coding Standards

**Frontend (React + Tailwind):**
- Use functional components with hooks
- Follow React best practices
- Use Tailwind utility classes
- Leverage shadcn/ui components
- Implement proper error handling

**Backend (PHP):**
- Follow PSR-12 coding standards
- Use prepared statements for SQL queries
- Implement proper error handling
- Validate and sanitize all inputs
- Return consistent JSON responses

Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines.

---

## 📝 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

## 📧 Contact

**Gymnazo Christian Academy**

- 📍 **Address:** 268 Zabala St. Cor. Lualhati St. Tondo, Manila, Philippines
- 📧 **Email:** NOT AVAILABLE
- ☎️ **Phone:** NOT AVAILABLE

**Developer**

**John Rey Calipes**
- 🐙 **GitHub:** [@OpenYaji](https://github.com/OpenYaji)
- 🔗 **Project Link:** [https://github.com/OpenYaji/School-Management-System-GYMNAZO](https://github.com/OpenYaji/School-Management-System-GYMNAZO)

---

## 🙏 Acknowledgments

- Thanks to all contributors and the development team
- Gymnazo Christian Academy administration and staff
- The open-source community for React, Tailwind CSS, and shadcn/ui
- Students and parents who provided valuable feedback
- Special thanks to the education sector for continuous support

---

## 🔒 Security

- ✅ All passwords are hashed using **bcrypt**
- ✅ **JWT tokens** for secure authentication
- ✅ **SQL injection** prevention through prepared statements
- ✅ **XSS protection** on all user inputs
- ✅ **CSRF token** validation
- ✅ Secure session management
- ✅ Regular security audits

For security issues, please email: **NOT AVAILABLE**

---

<div align="center">
  <p><strong>Made with ❤️ for Gymnazo Christian Academy - Novaliches</strong></p>
  <p><em>"Affordable and Accessible Quality Education"</em></p>
</div>
