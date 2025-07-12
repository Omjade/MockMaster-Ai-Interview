<h1 align="center">🎯 MockMaster – AI-Powered Mock Interview Platform</h1>

<p align="center">
  💬 Real-time AI Interviews &nbsp; | &nbsp; 🎯 Role-Specific Feedback &nbsp; | &nbsp; 🚀 Powered by Google Gemini
</p>

---

## 🚀 Project Overview

**MockMaster** is a smart, AI-powered web application that simulates **real-time, role-specific mock interviews** and provides **personalized feedback**.

Designed to assist students and job seekers in building confidence for both technical and non-technical roles, it mimics the natural flow of interviews using **Google’s Gemini LLM API**.

---

## 📊 Impact

- ✅ Used by **15+ students** and job seekers  
- 🔄 Reduced interview preparation time by **~12%**  
- 💬 Real-time, dynamic Q&A based on role and domain  
- 📈 Personalized suggestions and confidence scoring

---

## 🧰 Tech Stack

| Technology         | Usage Description                          |
|--------------------|---------------------------------------------|
| 🧠 Google Gemini API | Interview question generation + feedback   |
| ⚛️ ReactJS           | Interactive frontend framework             |
| ⚡ Next.js           | Full-stack framework with routing & SSR    |
| 🔐 Clerk             | Authentication and user session handling  |
| 🧪 Drizzle ORM       | Type-safe DB queries & schema management   |
| 🐘 PostgreSQL        | Database to manage users & sessions        |
| 🎨 Tailwind CSS      | UI styling and responsive layout           |

---

## 📸 Live Demo

🌐 **Try It Here**:  
👉 https://mock-master-ai-interview.vercel.app  
📱 *Best on desktop for full interaction *

---

## 💡 Key Features

- 🎯 Role-based interview question simulation  
- ⏱️ Real-time interaction with AI  
- 📬 Personalized follow-up feedback  
- 👤 Secure login with Clerk  
- 🧭 Simple, distraction-free interface

---

## 📁 Folder Structure

├── app/ → Main routes and pages
├── components/ → UI components (buttons, cards, etc.)
├── components/ui/ → Styled UI elements
├── lib/ → DB configs, helpers
├── utils/ → Utility functions
├── public/ → Static assets
├── drizzle.config.js → DB schema config
├── next.config.mjs → Next.js configuration
├── tailwind.config.js → TailwindCSS setup


---

## 🛠️ Getting Started

To run this project locally:

```bash
# 1. Clone the repo
git clone https://github.com/Omjade/MockMaster-Ai-Interview.git
cd MockMaster-Ai-Interview

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
http://localhost:3000
⚠️ You'll need to set up environment variables for Clerk and Gemini API keys.


🌱 Future Enhancements
🎤 Voice-based interview support

🧾 Interview history dashboard

📁 Export responses to PDF

📄 Resume-aware interview customization

🧠 Learning Highlights
Implemented secure auth flow with Clerk

Integrated Google Gemini for real-time NLP

Built custom components with TailwindCSS

Used Drizzle ORM for structured DB access

Hosted live app on Vercel with continuous deployment

🤝 Contributing
Open to feedback, feature requests, and pull requests!
Want to improve the UI or add a domain? Fork away! 🛠️

🔗 Connect with Me
💼 Portfolio: https://omjade.netlify.app

🔗 LinkedIn: https://linkedin.com/in/om-jade

📧 Email: omjade2854@gmail.com

🧑‍💻 GitHub: https://github.com/Omjade

<p align="center"> <em>“Interviews made smarter with AI. Practice with precision.”</em> </p> ```







This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
