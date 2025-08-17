# Doctor Appointment Booking Website

## Overview
A full-stack doctor appointment booking system with separate frontend and backend. Users can view active doctors, book, cancel, and reschedule appointments. Admins can manage doctors and slots.

---

## Features
- User can view active doctors and their specializations
- Book, cancel, and reschedule appointments
- Admin CRUD for doctors and slots
- Slot availability based on selected date
- Pagination and filtering for doctors and appointments
- REST API with Swagger
---

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **API Documentation:** Swagger

---

## Setup

### Backend
1. Clone the backend repository:
git clone <your-repo-url>
cd <repo-folder>

2. Install dependencies:
npm install

3. Create a .env file:
PORT=5000
MONGO_URI=<your-mongo-connection-string>
JWT_SECRET=<your-secret-key>

4. Start the server:
npm start

5. Create a folder named `uploads` in the **root of your backend project**. This folder will store all uploaded files.