
# 🚀 **Task Manager — Full-Stack Assignment (React + Node + MongoDB + AWS Lambda + Gemini AI)**

A complete full-stack **Task Manager application** built with **React, Node.js, Express, MongoDB**, an **AWS Lambda microservice for login**, and **Google Gemini (2.5 Flash)** for AI-powered task title suggestions.

This project demonstrates **microservice architecture**, **clean folder structure**, **AI integration**, **backend workflow logic**, and **complete CRUD operations**.

---

🧠 Problem-Solving Approach

This project required combining multiple technologies (React, Node.js, AWS Lambda, MongoDB, Gemini AI).
To tackle it efficiently, I followed a structured approach:

1️⃣ Understanding Requirements Clearly

Before writing any code, I broke down the assignment into modules:

Task CRUD (Core)

Filters & Status workflow

Activity Logs (Bonus)

AI Suggestion Panel

AWS Lambda Login Microservice

Clean folder structure

Deployment (Render + Vercel)

This helped me plan the sequence of development.

2️⃣ Backend-First Development

I started by designing:

Task schema

Activity Log schema

Controllers & Routes

Status workflow rules

Centralized error handling

CORS configuration

Reason:
A stable backend ensures the frontend consumes consistent APIs.

3️⃣ Solving the AWS Lambda Authentication Challenge

AWS Lambda was the trickiest part due to CORS issues.

My approach:

Step 1 — Reproduce the issue

Browser showed:

Access blocked by CORS

Step 2 — Isolate the cause

Found that Function URL was not sending:

✔ Access-Control-Allow-Origin
✔ OPTIONS preflight response

Step 3 — Implement solution

Added custom OPTIONS handler:

if (event.requestContext?.http?.method === "OPTIONS") {
   return { statusCode: 200, headers: { ... } }
}


Result → Lambda started working both in Postman and frontend.

4️⃣ Gemini API Error Debugging Approach

First attempt used old Gemini endpoint → returned empty results.

Steps followed:

Checked Google documentation

Found new API: "gemini-2.5-flash"

Updated to the official Generative AI SDK

Handled new result structure

Added fallbacks & error-handling

AI suggestions became stable and accurate.

5️⃣ Solving React Refresh Issue on Vercel

On refreshing /tasks or /create-task, the app crashed.

Diagnosis:

Vercel was looking for real server routes.

Solution:

Added vercel.json:

{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}


Now refresh works in production.

6️⃣ Handling Status Workflow Errors

Users could accidentally send invalid transitions.

To fix:

Created strict map:

Pending → In Progress
In Progress → Completed
Completed → []


Validated transitions before saving

This prevented inconsistent task states.

7️⃣ Clean Separation of Services

Each part was isolated:

Backend API → Render

Frontend → Vercel

Login → AWS Lambda

AI → Gemini

This aligns with microservice architecture, improving scalability.

8️⃣ Continuous Testing & Debugging

I used:

Postman for backend & Lambda

Console logs for Gemini

Network tab for CORS issues

Every feature was tested before moving ahead.

# 📌 **Features**

### ✅ **1. Create Task**

Each task includes:

* Title
* Description
* Category
* Priority (Low / Medium / High)
* Due Date
* Status *(default: Pending)*

---

### ✅ **2. List Tasks**

* View all tasks
* Filter by **Status** & **Priority**
* Beautiful **colored badges** for categories & priorities

---

### ✅ **3. Update Task**

* Edit any field
* Status follows a strict workflow:

```
Pending → In Progress → Completed
```

* Invalid transitions are prevented (e.g., Completed → In Progress)

---

### ✅ **4. Delete Task**

* Includes confirmation modal
* Deletes task and logs the action

---

### ⭐ **5. Activity Log (Bonus Feature Completed)**

Tracks **every important change** to a task:

| Event          | Logged? |
| -------------- | ------- |
| Task Created   | ✔       |
| Task Updated   | ✔       |
| Status Changed | ✔       |
| Task Deleted   | ✔       |

Each log stores:

* Timestamp
* Action type
* Old Value → New Value

---

### 🤖 **6. AI Task Title Suggestions (Gemini 2.5 Flash)**

User enters a description → Gemini generates **3 short, professional task titles**.

Uses latest **Google Generative AI SDK** with model `"gemini-2.5-flash"`.

---

### 🔐 **7. AWS Lambda Login Microservice (Mandatory Requirement Completed)**

Authentication handled independently via:

* AWS Lambda Function URL
* No IAM auth (public CORS-enabled API)
* Returns token & user data

Frontend interacts **directly** with the Lambda microservice.

---

# 🧰 **Tech Stack**

### **Frontend**

* React (Vite)
* Tailwind CSS
* Axios
* React Router

### **Backend**

* Node.js
* Express
* MongoDB + Mongoose
* Google Gemini AI SDK
* JWT

### **Cloud**

* AWS Lambda (login microservice)
* AWS Function URL
* Postman (testing)

---

# 📁 **Folder Structure (Requirement Met)**

```
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
```

---

# ⚙️ **Setup Instructions**

## 1️⃣ Clone Repository

```sh
git clone https://github.com/your-repo/task-manager.git
cd task-manager
```

---

# 🖥 Backend Setup

### Install dependencies:

```sh
cd server
npm install
```

### Create `.env` file:

```
MONGO_URI=your_mongodb_url
PORT=5000
GEMINI_API_KEY=your_gemini_key
```

### Start server:

```sh
npm run dev
```

---

# 🌐 Frontend Setup

### Install dependencies:

```sh
cd client
npm install
```

### Create `.env`:

```
VITE_API_URL=http://localhost:5000/api
VITE_AWS_LAMBDA_LOGIN_URL=https://your-lambda-url.on.aws/
```

### Start frontend:

```sh
npm run dev
```

---

# 🔑 **AWS Lambda Login Setup**

### Step 1 — Create Lambda function

Runtime: **Node.js 20.x**

### Step 2 — Add login code

✔ Includes CORS
✔ Returns mock JWT
✔ Handles OPTIONS preflight

### Step 3 — Enable Function URL

* Auth: **NONE**
* CORS Allowed:

  * Origins: `*`
  * Methods: `POST, OPTIONS`
  * Headers: `*`

### Step 4 — Test via Postman

```
POST https://your-lambda-url.on.aws/
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

# 🤖 **AI Integration (Gemini 2.5 Flash)**

Uses latest SDK:

```js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const result = await model.generateContent(prompt);
```

AI returns **3 task title suggestions**.

---

# 🧩 **Challenges Faced & Solutions**

## **1️⃣ Gemini API Failure (Old API Deprecated)**

❌ Old gemini-pro endpoint returned empty output
✔ Switched to **`gemini-2.5-flash` SDK**
✔ Handled new result format

---

## **2️⃣ AWS CORS Blocked Requests**

Error:

```
Access to fetch has been blocked by CORS policy
```

Solutions:

* Added `OPTIONS` handler
* Allowed `POST, OPTIONS`
* Enabled `Access-Control-Allow-Origin: *`

---

## **3️⃣ Invalid Status Update Errors**

Error:

```
Cannot change status from Completed to In Progress
```

Reason: PUT sent wrong status
Solution:

* Enforced **strict workflow**
* Added validation before updating

---

## **4️⃣ AI Endpoint Returning 404**

Issue: Frontend hitting `/ai/suggest-title` instead of `/api/ai/suggest-title`
Fix:

* Updated axios base URL
* Created `axiosInstance`

---

## **5️⃣ Activity Log Inconsistencies**

Some logs stored null values
Fix:

* Standardized `oldValue/newValue`
* Separate handling for status updates vs field updates

---

# ⏱ **Time Log**

| Task                               | Time          |
| ---------------------------------- | ------------- |
| Frontend UI                        | 2 hrs         |
| Backend CRUD                       | 2 hrs         |
| AI Integration                     | 1.5 hrs       |
| AWS Lambda Login                   | 1.5 hrs       |
| Activity Logs                      | 1 hr          |
| Bug Fixing (CORS, Gemini, Routing) | 1 hr          |
| UI Polish                          | 30 mins       |
| **Total Time**                     | **9.5 hours** |

---

# 🚀 **Future Improvements**

* Role-based Authentication
* Register System with DynamoDB
* Email Reminders for Due Dates
* Drag & Drop Kanban Board
* Real-time updates using WebSockets



