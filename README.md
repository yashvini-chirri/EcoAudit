# EcoAudit – Smart Waste Management & Sustainability Tracker

## Overview

EcoAudit is a web-based waste management and sustainability tracking application developed as part of the **CodeChef VITC Projects Department Recruitment**. The application enables users to record waste generation, visualize waste locations, and monitor environmental impact through an interactive dashboard.

The platform utilizes browser geolocation to automatically capture user location, stores waste records in a real-time database, provides analytics through a live dashboard, and displays waste locations on an interactive map.

---

## Features

* Record waste entries with:

  * Waste category
  * Waste weight
  * Automatic browser geolocation
  * Image upload
* Real-time dashboard updates
* Interactive Leaflet map displaying waste locations
* Live waste statistics
* Category-wise waste distribution
* Responsive user interface
* Dark mode support
* Animated splash screen
* Image upload support

---

## Technology Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS
* React Leaflet

### Backend

* Supabase
* PostgreSQL
* Supabase Storage

### Deployment

* Vercel

### Version Control

* Git
* GitHub

---

## Project Structure

```text
EcoAudit/
│
├── public/
│   ├── ec.png
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SplashScreen.jsx
│   │   ├── WasteForm.jsx
│   │   ├── Dashboard.jsx
│   │   ├── WasteMap.jsx
│   │   └── ...
│   │
│   ├── services/
│   │   └── supabase.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## Functionalities

### Waste Logging

* Select waste category
* Enter waste weight
* Automatically fetch user location using the Browser Geolocation API
* Upload waste image
* Store all information in Supabase

### Dashboard

* Display all recorded waste logs
* Live total waste statistics
* Category-wise analytics
* Real-time updates from the database

### Interactive Map

* Displays logged waste locations using Leaflet
* Visual representation of waste distribution

---

## Database

Supabase PostgreSQL is used as the backend database.

### Table: `waste_logs`

| Column     | Type                 |
| ---------- | -------------------- |
| id         | UUID                 |
| created_at | Timestamp            |
| category   | Text                 |
| weight     | Float                |
| latitude   | Float                |
| longitude  | Float                |
| image_url  | Text (if applicable) |

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/EcoAudit.git
```

Navigate to the project

```bash
cd EcoAudit
```

Install dependencies

```bash
npm install
```

Configure environment variables by creating a `.env` file.

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Start the development server

```bash
npm run dev
```

---

## Deployment

The application is deployed using **Vercel**.

---

## Screenshots

Include screenshots for:

* Splash Screen
* Home Dashboard
* Waste Logging Form
* Interactive Map
* Analytics Dashboard
* Dark Mode

---

## Future Enhancements

* User authentication
* AI-based waste classification
* Carbon footprint estimation
* Waste collection scheduling
* Administrative dashboard
* PDF report generation
* Notification system
* Data filtering and search

---

## Learning Outcomes

This project demonstrates practical implementation of:

* React component architecture
* State management using React Hooks
* Browser Geolocation API
* Supabase database integration
* CRUD operations
* Image upload and storage
* Interactive mapping with Leaflet
* Responsive UI development
* Deployment using Vercel

---

## Author

**Yashvini**

Developed as part of the **CodeChef VITC Projects Department Recruitment**.

---

## License

This project is intended for educational and recruitment purposes.
