# Smart Journal

A lightweight web application for creating, organizing, and managing personal journal entries. It provides a clean interface for adding notes, browsing saved entries, filtering them by date, and removing entries whenever needed.

---

## Features

- Save journal entries with a specific date.
- Add a title and detailed description for every entry.
- Filter notes using a selected date.
- View all saved entries in a structured layout.
- Delete unwanted entries instantly.
- Responsive design for desktop and mobile devices.

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```text
smart-journal/
│
├── server.js
├── package.json
├── README.md
│
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Manurajput123/Notes-Management.git
```

Move into the project directory:

```bash
cd smart-journal
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Running the Application

Start the Express server:

```bash
node server.js
```

If everything starts successfully, open your browser and visit:

```
http://localhost:3000
```

---

## Available Operations

- Create a new journal entry
- Retrieve all saved entries
- Filter entries by date
- Delete an existing entry

---

## 💻 REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/entries | Retrieve all entries |
| GET | /api/entries?date=YYYY-MM-DD | Retrieve entries for a specific date |
| POST | /api/entries | Create a new entry |
| DELETE | /api/entries/:id | Delete an entry |

---

## Future Improvements

- Edit existing entries
- Search by title
- Category support
- User authentication
- Dark mode
- Pagination

---

## 📄 License

This project is developed for learning purposes and demonstrates CRUD operations using Node.js, Express, MongoDB, and JavaScript.
