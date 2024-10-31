# Doctor Appointment Application

## Overview

The **Doctor Appointment Application** is a simple web application designed for booking doctor appointments. The application allows patients to schedule appointments with doctors, specifying details like appointment time, doctor’s name. The application is built using a microservices architecture, where the frontend and backend services are separated and managed through containerization.

## Architecture

The application follows a **microservices architecture** and consists of three main components:

1. **Frontend**: Developed with **React**, this component provides a user interface for patients to book and view their appointments.
2. **Backend**: Developed with **Node.js** and **Express**, this REST API handles appointment data management and interacts with the DynamoDB database.
3. **Database**: **MongoDB** is used to store appointment details, and it can be hosted locally or on a managed cloud database provider (for production).

### Deployment Architecture

The application is containerized using **Docker** and deployed on an **Amazon EKS** (Elastic Kubernetes Service) cluster. Each component is packaged into a Docker container and managed in Kubernetes pods on the EKS cluster.

---

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (Amazon EKS)

---

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/your-username/doctor-appointment-app.git](https://github.com/saicharan0807/midterm/)
   cd doctor-appointment-app/backend
2. **Install dependencies**:
   ```bash
   npm install
3. **Set up environment Variables**: Create a `.env` file in the `backend` directory with the following variables
   ```bash
   MONGO_URI=<your_mongo_database_uri>
   PORT=8080
4. **Start the backend server**:
   ```bash
   node app.js

The backend server should now be running on `http://localhost:3000`.
