💰 Finance Dashboard (Angular)

A modern Finance Dashboard Web App built using Angular.
This application allows users to track income and expenses, visualize data with charts, and manage transactions with role-based access.

🚀 Features

📊 Dashboard Overview

Total Balance, Income, and Expense summary cards

📈 Balance Trend (Line Chart)

🥧 Spending Breakdown (Pie Chart)

🔍 Top Spending Category insight

💳 Transactions Management

View all transactions (Date, Amount, Category, Type)

🔍 Search / Filter by category

➕ Add new transactions (Admin only)

✏️ Edit transactions (Admin only)

🗑 Delete transactions (Admin only)

📊 Real-time chart updates

🔐 Authentication & Roles

Simple Login system (Frontend-based)

Two roles:

👨‍💼 Admin → Full access (Add/Edit/Delete)

👤 Viewer → Read-only access

Route protection using Auth Guard

🌙 UI & UX Enhancements

Clean and responsive layout

Premium dashboard UI (cards + charts)

Dark Mode support

Loading Skeleton + animations

Sidebar navigation (Razorpay/Paytm style)

📁 Data Handling

LocalStorage used for persistence

Real-time updates across components

Centralized state via services

📤 Export Feature

Export transactions as CSV file

🛠 Tech Stack

Angular (Standalone Components)

TypeScript

Chart.js (for data visualization)

HTML5 + CSS3

LocalStorage (for data persistence)

⚙️ Installation & Setup

# Clone the repo
git clone https://github.com/your-username/finance-dashboard.git

# Navigate to project
cd finance-dashboard

# Install dependencies
npm install

# Run the app
ng serve
Open in browser:

http://localhost:4200/
🧠 Future Improvements

Backend integration (Node.js + MongoDB)

JWT Authentication

Advanced filtering & sorting

Monthly analytics

Mobile app version


⭐ Acknowledgement

This project is built for learning and demonstration purposes, inspired by modern fintech dashboards like Razorpay and Paytm.

📌 Conclusion

This project demonstrates:

Component-based architecture

State management

Role-based UI

Data visualization

Real-world UI/UX practices
