<div align="center">

# 🎫 Datastraw CRM
### Customer Support Ticketing System

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.5-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A full-stack CRM system for managing customer support tickets — built as the **Datastraw AI + Tech Intern Assessment**.

[🚀 Live Demo](#) · [🔌 Backend API](https://costmer-support-management.onrender.com/api/health) · [📂 Repository](https://github.com/surajpsharma/costmer-support-management) · [🐛 Report Bug](https://github.com/surajpsharma/costmer-support-management/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)

---

## 🔍 About the Project

Datastraw CRM is a full-stack customer support ticketing platform that allows support teams to **create**, **track**, **search**, and **resolve** customer issues efficiently. It features a modern dark-mode UI with real-time search, status filtering, priority tagging, and a full notes/comments timeline.

Built with **Node.js + Express** on the backend, **React + Vite** on the frontend, and **MongoDB** as the database.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎫 **Create Tickets** | Auto-generated `TKT-001` style IDs with customer details |
| 📋 **Dashboard** | Responsive ticket grid with live stats bar |
| 🔍 **Live Search** | Debounced real-time search across name, email, ID, subject |
| 🔖 **Status Filter** | Filter tickets by Open / In Progress / Closed |
| 🔴 **Priority Tags** | Color-coded Low / Medium / High / Critical badges |
| 📄 **Ticket Detail** | Full ticket view with status update & notes timeline |
| 💬 **Notes / Comments** | Append timestamped notes from support agents |
| 📊 **Stats Bar** | Real-time Total / Open / In Progress / Closed counts |
| ✅ **Form Validation** | Client-side validation with helpful error messages |
| 🔔 **Toast Notifications** | Success/error feedback on all actions |

---

## 🛠 Tech Stack

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.19 | REST API framework |
| Mongoose | 8.5 | MongoDB ODM |
| Morgan | 1.10 | HTTP request logger |
| CORS | 2.8 | Cross-origin requests |
| dotenv | 16.4 | Environment variables |
| nodemon | 3.1 | Dev auto-restart |

### Frontend
| Package | Version | Purpose |
|---------|---------|---------|
| React | 18 | UI library |
| Vite | 5 | Build tool & dev server |
| React Router | v6 | Client-side routing |
| Axios | latest | HTTP client |
| React Hot Toast | latest | Toast notifications |
| Lucide React | latest | Icon library |

### Database
- **MongoDB** — local (`mongodb://127.0.0.1:27017`) or [MongoDB Atlas](https://cloud.mongodb.com)

---

## 📁 Project Structure

```
datastraw-crm/
│
├── backend/                        # Node.js + Express API
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ticketsController.js   # CRUD logic + search/filter
│   │   ├── middleware/
│   │   │   └── errorHandler.js        # Global error handler
│   │   ├── models/
│   │   │   ├── Ticket.js              # Ticket schema + auto TKT-XXX ID
│   │   │   └── Note.js               # Note schema
│   │   ├── routes/
│   │   │   └── tickets.js             # All 4 API routes
│   │   └── server.js                  # Express app entry point
│   ├── .env                           # Local environment variables
│   ├── .env.example                   # Environment variable template
│   └── package.json
│
├── frontend/                       # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Top navigation bar
│   │   │   ├── TicketCard.jsx         # Ticket summary card
│   │   │   └── StatusBadge.jsx        # Status & priority badges
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Dashboard + search + filter
│   │   │   ├── CreateTicket.jsx       # Create ticket form
│   │   │   └── TicketDetail.jsx       # View + update ticket + notes
│   │   ├── services/
│   │   │   └── api.js                 # Axios API service
│   │   ├── App.jsx                    # Router setup
│   │   ├── main.jsx                   # React entry point
│   │   └── index.css                  # Global dark-mode design system
│   ├── .env                           # Frontend env (API base URL)
│   ├── .env.example
│   └── package.json
│
├── docs/
│   └── tasks/
│       └── PRD.md                     # Product Requirements Document
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a [MongoDB Atlas](https://cloud.mongodb.com) account

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/surajpsharma/costmer-support-management.git
cd costmer-support-management
```

---

### 2️⃣ Setup Backend

```bash
cd backend
```

Copy the example env file and fill in your MongoDB URI:

```bash
cp .env.example .env
```

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/datastraw_crm
PORT=5000
NODE_ENV=development
```

> **Using MongoDB Atlas?** Replace the URI with your Atlas connection string:
> ```
> MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/datastraw_crm
> ```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

✅ Backend running at → `http://localhost:5000`

---

### 3️⃣ Setup Frontend

Open a new terminal:

```bash
cd frontend
```

Copy the env file:

```bash
cp .env.example .env
```

The default `.env` points to your local backend:

```env
VITE_API_URL=http://localhost:5000/api
```

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

✅ Frontend running at → `http://localhost:5173`

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

---

### 📌 Create Ticket
```http
POST /api/tickets
```

**Request Body:**
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "subject": "Login page not loading",
  "description": "Getting 500 error on login with valid credentials.",
  "priority": "High"
}
```

**Response `201`:**
```json
{
  "success": true,
  "data": {
    "ticket_id": "TKT-001",
    "customer_name": "John Doe",
    "status": "Open",
    "priority": "High",
    "created_at": "2026-09-14T00:00:00.000Z"
  }
}
```

---

### 📋 Get All Tickets
```http
GET /api/tickets
```

**Query Parameters (all optional):**

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Search across name, email, ID, subject |
| `status` | string | `Open` \| `In Progress` \| `Closed` |
| `priority` | string | `Low` \| `Medium` \| `High` \| `Critical` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 50) |

**Example:**
```http
GET /api/tickets?status=Open&search=john&priority=High
```

**Response `200`:**
```json
{
  "success": true,
  "total": 3,
  "stats": {
    "open": 2,
    "inProgress": 1,
    "closed": 0,
    "total": 3
  },
  "data": [ ... ]
}
```

---

### 🔍 Get Single Ticket
```http
GET /api/tickets/:ticket_id
```

**Response `200`:**
```json
{
  "success": true,
  "data": {
    "ticket_id": "TKT-001",
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "subject": "Login page not loading",
    "description": "Getting 500 error...",
    "status": "Open",
    "priority": "High",
    "created_at": "...",
    "updated_at": "...",
    "notes": [
      {
        "note_text": "Looking into this issue.",
        "author": "Support Agent",
        "created_at": "..."
      }
    ]
  }
}
```

---

### ✏️ Update Ticket
```http
PUT /api/tickets/:ticket_id
```

**Request Body (all fields optional):**
```json
{
  "status": "In Progress",
  "priority": "Critical",
  "note_text": "Identified the root cause. Escalating to backend team.",
  "author": "Support Agent"
}
```

**Response `200`:**
```json
{
  "success": true,
  "data": { ...updatedTicket, "notes": [ ... ] }
}
```

---

### 🏥 Health Check
```http
GET /api/health
```

```json
{ "status": "OK", "timestamp": "2026-09-14T00:00:00.000Z" }
```

---

## 🗄 Database Schema

### `tickets` Collection

| Field | Type | Description |
|-------|------|-------------|
| `ticket_id` | String | Auto-generated unique ID (`TKT-001`) |
| `customer_name` | String | Customer's full name (required) |
| `customer_email` | String | Customer's email (required, validated) |
| `subject` | String | Issue title / subject (required) |
| `description` | String | Detailed description (required) |
| `status` | Enum | `Open` · `In Progress` · `Closed` |
| `priority` | Enum | `Low` · `Medium` · `High` · `Critical` |
| `created_at` | Date | Auto-timestamp |
| `updated_at` | Date | Auto-updated on change |

### `notes` Collection

| Field | Type | Description |
|-------|------|-------------|
| `ticket_id` | String | Reference to parent ticket |
| `note_text` | String | Note content (required) |
| `author` | String | Agent name (default: "Support Agent") |
| `created_at` | Date | Auto-timestamp |

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | ✅ Yes | MongoDB connection string |
| `PORT` | ❌ No | Server port (default: `5000`) |
| `NODE_ENV` | ❌ No | `development` or `production` |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ Yes | Backend API base URL |

---

## ☁️ Deployment

### Backend → [Render](https://render.com)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo, select the `backend/` folder
4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variable: `MONGODB_URI` = your Atlas connection string
6. Deploy!

### Frontend → [Vercel](https://vercel.com)

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo, set **Root Directory** to `frontend/`
3. Add environment variable: `VITE_API_URL` = your Render backend URL (e.g. `https://datastraw-crm.onrender.com/api`)
4. Deploy!

---

## 🧪 Running Tests (Manual)

Once both servers are running:

1. **Create a ticket** → Go to `http://localhost:5173` → Click **New Ticket**
2. **Search** → Type in the search bar → Results filter in real-time
3. **Filter** → Click `Open` / `In Progress` / `Closed` tabs
4. **Update** → Open a ticket → Change status → Click Save Changes
5. **Add Note** → Scroll down on ticket detail → Fill in note form → Click Add Note
6. **API directly** → Open `http://localhost:5000/api/tickets` in browser

---

## 👤 Author

**Suraj Sharma**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/suraj-sharma-b72156287)
[![Instagram](https://img.shields.io/badge/Instagram-Follow-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/__suraj__sharma____)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat&logo=github)](https://github.com/surajpsharma)
[![Repo](https://img.shields.io/badge/Repo-costmer--support--management-6366f1?style=flat&logo=github)](https://github.com/surajpsharma/costmer-support-management)

---


<div align="center">
  Made with ❤️ using Node.js · React · MongoDB
</div>
