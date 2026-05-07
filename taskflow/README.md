# TaskFlow — Project Management Tool

A Kanban-based Project Management Tool built with React.js and Tailwind CSS.

![TaskFlow Dashboard](https://via.placeholder.com/800x400?text=TaskFlow+Dashboard)

## 👨‍💻 Developer
Golu Sen — Solo Capstone Project (Day 25-30)
Linkific Internship

## 🚀 Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS v3
- **State Management:** Context API + useReducer
- **Charts:** Recharts
- **Routing:** React Router v6
- **Data Persistence:** localStorage
- **Auth:** Mock authentication (localStorage)

## ✨ Features
- User authentication (Login / Register / Logout)
- Create, edit, delete projects
- Kanban board (To Do / In Progress / Done)
- Task details (title, description, priority, due date)
- Drag tasks between columns via task modal
- Priority filter (All / High / Medium / Low)
- Sort tasks by priority, due date, title
- Dashboard with live stats and Recharts bar charts
- Search projects by name or description
- Toast notifications for all actions
- Form validation with inline error messages
- Loading skeleton on task add
- Empty states for all sections
- Responsive design
- Persistent data via localStorage

## 🛠️ Setup Instructions
```bash
git clone https://github.com/Linkific-Internship/taskflow.git
cd taskflow/taskflow
npm install
npm run dev
```

## 🔧 Environment Variables
```env
VITE_APP_NAME=TaskFlow
VITE_VERSION=1.0.0

## 📁 Project Structure

src/
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── kanban/
│   ├── projects/
│   └── shared/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Loading.jsx
│       ├── Skeleton.jsx
│       ├── ErrorMessage.jsx
│       ├── Toast.jsx
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       ├── Layout.jsx
│       └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx
│   └── ProjectContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useToast.js
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── Projects.jsx
│   └── KanbanPage.jsx
└── utils/
└── localStorage.js

## 📅 Development Timeline
| Day | Focus |
|-----|-------|
| Day 25 | Planning & Architecture |
| Day 26 | Authentication + Routing + Core Components |
| Day 27 | Search, Filter, Validation, Toast Notifications |
| Day 28 | Sorting, Skeleton, Recharts Dashboard |
| Day 29 | Testing, Optimization, Documentation |
| Day 30 | Deployment |

## 📊 Lighthouse Scores
| Metric | Score |
|--------|-------|
| Performance | 100 |
| Accessibility | 81 |
| Best Practices | 100 |
| SEO | 82 |

## 🔗 Live Demo
[TaskFlow — Live on Netlify](https://taskflowday30.netlify.app)

