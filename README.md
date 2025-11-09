# Gamyam Product Management Assignment

This project is a simple product management interface built as part of the Gamyam interview assignment.  
It demonstrates product listing, search with debounce, add/edit functionality, and pagination — all implemented using React.

---

## Features

### Product List
- Display products in **List view (table)** and **Card view (grid)**.
- Option to toggle between both views.

### Search (with Debounce)
- Real-time search by product name.
- Debounce delay set to **500ms** to optimize performance.

### Add & Edit Product
- Form fields:
  - **Name** (required)
  - **Price** (number, required)
  - **Category** (required)
  - **Stock** (number, optional)
  - **Description** (optional)
- Includes basic form validation with inline error messages.
- Data stored and updated in **local state (no backend)**.

###  Pagination
- Displays products with pagination for easy navigation.

---

## 🛠️ Tech Stack
- **React.js**
- **JavaScript (ES6+)**
- **React Hooks (useState, useEffect)**
- **Custom Hooks** (for Debounce)

---

## ⚙️ Installation & Setup

1. Clone the repository  
   ```bash
  
