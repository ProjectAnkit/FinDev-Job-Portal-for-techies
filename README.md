# 🚀 FinDev - Job Portal for Techies

Welcome to **FinDev**, the ultimate job portal tailored for **developers, tech enthusiasts, and recruiters**! Whether you're on the hunt for your dream job or hiring top-tier talent, FinDev simplifies the process with a powerful, elegant, and secure platform.

---

## 🌟 Features

- 🔐 **User Authentication** — Secure login/register using JWT.
- 📢 **Job Posting** — Employers post detailed job listings.
- 📄 **Job Applications** — Job seekers apply with resumes and track their applications.
- 🔖 **Bookmark Jobs** — Save jobs to apply later.
- 🧑‍💼 **Employer Dashboard** — View jobs, manage applicants, update statuses.
- 👨‍🎓 **Job Seeker Dashboard** — Monitor job application progress.
- 🌀 **Smooth Animations** — Built with Framer Motion.
- 📱 **Responsive Design** — Styled with Tailwind CSS.
- 🔔 **Real-Time Notifications** — Toastify for instant user feedback.
- 🔐 **Protected Routes** — Access control with middleware.

---

## 🛠️ Tech Stack

**Frontend:**
- `Next.js`, `React`, `Redux Toolkit`
- `Tailwind CSS`, `Framer Motion`, `React Hook Form`

**Backend:**
- `Next.js API Routes`, `MongoDB`, `Mongoose`

**Authentication:**
- `JWT`, `bcryptjs`, `Cookies`

**Utilities:**
- `Axios`, `React Icons`, `React Toastify`, `Formidable`, `Joi`, `js-cookie`

---

## 📂 Project Structure

```bash
FinDev/
├── components/            # Reusable UI components
├── Services/              # API service functions (auth, job)
├── Store/                 # Redux store setup
├── Utils/                 # Redux slices (UserSlice, JobSlice)
├── models/                # MongoDB schemas (User, Job, ApplyJob)
├── middleware/            # Auth middleware (JWT validation)
├── public/                # Static files (images, icons)
├── styles/                # Global and modular CSS
├── pages/
│   ├── api/               # API routes
│   ├── auth/              # Login/Register pages
│   └── frontend/          # Main app pages (Post, Apply, Dashboard)
├── .env                   # Environment configuration
└── README.md              # Project documentation
