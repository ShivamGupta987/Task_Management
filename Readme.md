Task Manager — Full-Stack Assignment (React + Node + MongoDB + AWS Lambda + Gemini AI)

A complete full-stack Task Manager application built using React, Node.js, Express, MongoDB, AWS Lambda microservice for login, and Google Gemini for AI-powered task title suggestions.

This project demonstrates microservice architecture, clean folder structure, AI integration, backend workflow logic, and full CRUD operations.

📌 Features
✅ 1. Create Task

Task includes:

Title

Description

Category

Priority (Low / Medium / High)

Due Date

Status (default: Pending)

✅ 2. List Tasks

Shows all tasks

Filter by Status & Priority

Displays colored badges

✅ 3. Update Task

Edit all fields

Enforced status workflow:
Pending → In Progress → Completed

Prevents invalid transitions

✅ 4. Delete Task

Confirmation modal

Removes task from DB

✅ 5. Activity Log (Bonus Feature)

Tracks everything that happens to a task:

Action	Logged?
Task Created	✔
Task Updated	✔
Status Changed	✔
Task Deleted	✔

Each log stores:

timestamp

action

old → new values

✅ 6. AI Task Title Suggestions (Gemini 2.5 Flash)

User enters a task description →
AI suggests 3 short, professional task titles.

✅ 7. AWS Lambda Login Microservice

Authentication handled by:

AWS Lambda

Function URL

CORS-enabled

Returns JWT + user data

Frontend calls Lambda directly — no backend involvement.

🧰 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router

Backend

Node.js

Express

MongoDB + Mongoose

Gemini AI SDK

JWT

Cloud

AWS Lambda (Login microservice)

AWS API Gateway (Function URL)

Postman (Testing)

📁 Folder Structure (Mandatory Requirements Met)
client/
  src/
    components/
    pages/
    services/
    utils/

server/
  controllers/
  models/
  routes/
  config/

⚙️ Setup Instructions
1. Clone repository
git clone https://github.com/your-repo/task-manager.git
cd task-manager

🖥 Backend Setup
Install dependencies:
cd server
npm install

Create .env
MONGO_URI=your_mongodb_url
PORT=5000
GEMINI_API_KEY=your_gemini_key

Run server:
npm run dev

🌐 Frontend Setup
Install dependencies:
cd client
npm install

Create .env
VITE_API_URL=http://localhost:5000/api
VITE_AWS_LAMBDA_LOGIN_URL=https://your-lambda-url.on.aws/

Run:
npm run dev

🔑 AWS Lambda Login Setup
1. Create Lambda → "task-login-service"

Choose runtime: Node.js 20.x

2. Add this code:

✔ Includes CORS
✔ Hardcoded demo login (assignment requirement)
✔ JWT support

(Your Lambda code already implemented.)

3. Enable Function URL

Auth: NONE

CORS:

Allow Origins: *

Allow Methods: POST, OPTIONS

Allow Headers: *

4. Test in Postman

Works:

POST https://your-lambda.on.aws/
{
  "email": "admin@test.com",
  "password": "123456"
}

🤖 AI Integration (Gemini 2.5 Flash)

Uses the latest Google Generative AI SDK:

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const result = await model.generateContent(prompt);


Prompts generate 3 smart task titles.

🧩 Challenges Faced & Solutions
1️⃣ Gemini API Failure (Old API Deprecated)

Old v1beta gemini-pro endpoint returned empty results

Solved by upgrading to Gemini 2.5 Flash SDK

Fixed JSON parsing + stable responses

2️⃣ AWS Lambda CORS Blocking

Error:

Access to fetch has been blocked by CORS policy


Solution:

Implemented OPTIONS handler

Allowed POST, OPTIONS

Allowed all headers

Updated Lambda Function URL settings

Login began working across frontend → Lambda.

3️⃣ Status Update Workflow Breaking

Error:

Cannot change status from Completed to In Progress


Reason: PUT request included old status unintentionally.
Solution:

Added controlled workflow:

Pending → In Progress
In Progress → Completed


Now prevents invalid transitions gracefully.

4️⃣ Route Not Found for AI Endpoint

Issue: Frontend hitting /ai/suggest-title but backend was /api/ai/suggest-title.

Solution:

Fixed Axios base URL

Created reusable axiosInstance

5️⃣ Activity Log Schema Inconsistency

Some logs saved null values.

Solution:

Standardized logs depending on action type

Cleaning oldValue/newValue structure

⏱ Time Log
Task	Time
Frontend UI	2 hrs
Backend CRUD	2 hrs
AI Integration	1.5 hrs
AWS Lambda Login	1.5 hrs
Activity Logs	1 hr
Bug Fixing (CORS, Gemini, Routing)	1 hr
Final UI Polish	30 mins
Total Time Spent	9.5 hours
🚀 Future Improvements

Role-based auth (Admin/User)

Register system with DynamoDB

Task reminders via email

Drag & Drop task board

Deployment on Vercel + Render

Real-time updates (WebSockets)

🎥 Demo Video (5-min Loom)

📌 Upload on Loom and paste link here:

https://loom.com/your-video-link

⭐ Conclusion

This project demonstrates:

Full-stack CRUD

Microservices (AWS Lambda Auth)

AI Integration (Gemini)

MongoDB with Activity Logging

Clean architecture

Production-level error handling