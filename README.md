# 🚀 Transecta — Full-Stack AI Fraud Detection Platform

**Live Demo:** [https://transecta.repox.me](https://transecta.repox.me)

Transecta is a **real-time AI-powered fraud detection platform** built as a full-stack monorepo. It uses a **Next.js 15 frontend and backend**, with a **Python FastAPI microservice** for the trained ML model. Everything — frontend, backend, and infra — runs together for seamless integration and scalability.

---

## ✨ Key Features

* **⚡ Real-Time Fraud Prediction:** Classify transactions as *Fraud* or *Not Fraud* with confidence scores.
* **🔐 OAuth Authentication:** Google & GitHub login via **NextAuth.js**.
* **🔑 API Token Management:** Generate and manage secure tokens for external ML API use.
* **💬 AI Chat Assistant:** Built with **FlowiseAI** and **Gemini API**, guiding users interactively.
* **🧩 Unified Monorepo Setup:** Both web and ML services live in one codebase for easy deployment.

---

## 🏗️ System Overview

Transecta follows a modular yet unified architecture for better maintainability and scalability:

1. **Frontend (Next.js 15 + React 19):** User dashboard for predictions, tokens, and AI assistant.
2. **Backend (Next.js API Routes):** Handles authentication, database operations, and API forwarding.
3. **ML Microservice (Python FastAPI):** Serves the trained **XGBoost** model via REST API.
4. **AI Assistant (FlowiseAI):** Embedded Gemini-powered chatbot that guides users through the platform.

---

## 🧠 Machine Learning Model

The ML model is an **XGBoost Classifier** trained to detect fraudulent transactions in highly imbalanced datasets.

* **Dataset:** [Kaggle Online Payment Fraud Detection](https://www.kaggle.com/datasets/jainilcoder/online-payment-fraud-detection/data)
* **Issue:** Fraudulent transactions are extremely rare.
* **Approach:** Applied **SMOTE** to balance the dataset.
* **Key Features:** `amount`, `step`, `oldbalanceOrg`, `newbalanceOrig`, `oldbalanceDest`, `newbalanceDest`.
* **Full ML Code:** [ML Repository](https://github.com/Shivam5551/Online-Payment-Fraud-Detection-ML)

---

## 🧰 Tech Stack

| Layer                 | Technologies                                                             |
| --------------------- | ------------------------------------------------------------------------ |
| **Frontend**          | Next.js 15, React 19, TypeScript, TailwindCSS 4, Zustand, React Toastify |
| **Backend**           | Next.js API Routes, NextAuth.js (Google/GitHub), Prisma ORM              |
| **Database**          | Supabase (PostgreSQL)                                                    |
| **ML Service**        | FastAPI, Pandas, XGBoost, SMOTE                                          |
| **AI Chat Assistant** | FlowiseAI, Gemini API                                                    |
| **Deployment**        | Microsoft Azure                                                          |

---

## ⚙️ Running Locally

Since the frontend and backend are in the same repo, only the ML service runs separately.

### 🧠 Run the ML API (Python/FastAPI)

```bash
# Clone repo
 git clone https://github.com/Shivam5551/Online-Payment-Fraud-Detection-ML.git
 cd Online-Payment-Fraud-Detection-ML

# Setup environment
 python -m venv venv
 source venv/bin/activate  # Windows: .\venv\Scripts\activate
 pip install fastapi "uvicorn[standard]" pandas xgboost

# Ensure model.json exists in root
 uvicorn api:app --host 127.0.0.1 --port 8080
```

### 💻 Run the Web App (Next.js)

```bash
# Clone this repo
 cd frontend

# Install dependencies
 pnpm install

# Setup database
 pnpm prisma db push

# Start development server
 pnpm dev
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Google Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub Auth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Database
DATABASE_URL="db-url"
DIRECT_URL="direct-url"

# ML API Endpoint
ML_API=http://127.0.0.1:8080

# Flowise AI
FLOWISE_API_KEY=
FLOWISE_URL=
```

---

## 📦 Scripts Overview

From your `package.json`:

| Script        | Description                               |
| ------------- | ----------------------------------------- |
| `pnpm dev`    | Run Next.js in dev mode with Turbopack    |
| `pnpm build`  | Build for production                      |
| `pnpm start`  | Start production server                   |
| `pnpm lint`   | Run ESLint checks                         |
| `pnpm format` | Format code with Prettier                 |
| `pnpm prisma` | Run Prisma migrations and generate client |

---

## 🧩 Project Highlights

* Built using **Next.js 15.5 + React 19** for cutting-edge performance.
* Uses **Turbopack** for ultra-fast builds.
* Clean code architecture powered by **TypeScript** and **TailwindCSS 4**.
* **Prisma + Supabase** for scalable and reliable data storage.
* Fully integrated **AI assistant** powered by Flowise + Gemini API.

---

**Author:** Shivam Tiwari
**Project:** Transecta — Full Stack AI Fraud Detection Platform
