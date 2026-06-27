# EcoAudit – Smart Waste Management & Sustainability Tracker

## Overview

EcoAudit is a web-based waste management and sustainability tracking application . The application enables users to record waste generation, visualize waste locations, and monitor environmental impact through an interactive dashboard.

The platform utilizes browser geolocation to automatically capture user location, stores waste records in a real-time database, provides analytics through a live dashboard, and displays waste locations on an interactive map.

---
 **Live Demo:** https://eco-audit-wheat.vercel.app/

 **GitHub Repository:** https://github.com/yashvini-chirri/EcoAudit

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
git clone https://github.com/yashvini-chirri/EcoAudit.git
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
  <img width="1289" height="574" alt="image" src="https://github.com/user-attachments/assets/1212e3d5-2698-456f-aab8-9c9b82006398" />

* Home Dashboard
  <img width="1339" height="670" alt="image" src="https://github.com/user-attachments/assets/b005d78e-1265-4719-9336-c2f47250bd75" />

* Waste Logging Form
 <img width="1339" height="543" alt="image" src="https://github.com/user-attachments/assets/9105dbe5-db60-4f14-ad18-8e4c4c6c8ef1" />

* Interactive Map
  <img width="1291" height="550" alt="image" src="https://github.com/user-attachments/assets/4ed799e0-cbd7-4757-b644-854348a11d40" />

* Dark Mode
  <img width="1341" height="666" alt="image" src="https://github.com/user-attachments/assets/ced926c4-1ad9-460b-924e-a74e5c59ad6b" />


---

## Future Enhancements

* User authentication
* AI-based waste classification
* Carbon footprint estimation

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

## License

This project is intended for educational purposes.
