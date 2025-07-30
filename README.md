#  Spacer – Frontend

A modern React-based web application that connects users seeking **flexible workspaces** with owners offering them. The frontend is designed to provide a seamless experience for **browsing**, **booking**, and **managing** workspaces.

---

## Table of Contents

- [About the Project](#about-the-project)  
- [Project Statement](#project-statement)  
- [Objectives](#objectives)  
- [Project Scope](#project-scope)  
- [System Architecture](#system-architecture)  
- [Technologies Used](#technologies-used)  
- [Setup & Installation](#setup--installation)  
- [Contributing](#contributing)  
- [License](#license)

---

## About the Project

Group 6 presents **Spacer** as our Full Stack Capstone. This project uses **React (frontend)** and **Flask (backend)** to build a real-world application for managing space rentals. From booking shared offices to managing listings and payments, Spacer helps bring clients and owners together on a single platform.

---

##  Project Statement

Managing space rentals manually is inefficient and lacks scalability. Spacer aims to simplify that by offering a digital solution that:

- Allows users to **find and book** spaces easily
- Enables owners to **list, update, and manage** their spaces
- Provides both parties with **notifications** and **payment management**

---

##  Objectives

- Build a responsive and accessible frontend with React and Tailwind CSS  
- Implement JWT authentication with proper access control  
- Display listings and booking functionality for clients  
- Provide owner dashboards for managing spaces, bookings, and payments  
- Connect the frontend to a RESTful Flask API

---

## Project Scope

This frontend application will:

- Register/Login users (client and owner roles)
- Allow clients to browse and book available spaces
- Allow owners to create/edit/delete spaces
- Display and update payment and booking statuses
- Provide toast notifications for actions
- Handle protected routes and session persistence

---

## System Architecture


- **Pages**: React Router for client and owner dashboards  
- **Auth**: JWT stored in localStorage  
- **State**: useState/useEffect for dynamic data handling  
- **Notifications**: Toasts for feedback on all user actions  

---

## Technologies Used

- React + Vite
- Tailwind CSS
- React Router DOM
- React Toastify
- JWT for authentication
- Fetch API for backend communication
- Deployed via Vercel

---

##  Setup & Installation

 **Clone the repository**

```bash
git clone git@github.com:ManuG-lab/Spacer-frontend.git
cd spacer-frontend


npm install
Start the dev server

bash
Copy code
npm run dev


 Authors

@Christina Manga
@Muhammad Awadh
@Emmanuel Gitau
@Collins Kipngeno

## License
This project is licensed under the MIT License.
Feel free to clone, fork, and build upon it.