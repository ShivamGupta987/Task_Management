
# 🚀 **Task Manager — Full-Stack Assignment (React + Node + MongoDB + AWS Lambda + Gemini AI)**

A complete full-stack **Task Manager application** built with **React, Node.js, Express, MongoDB**, an **AWS Lambda microservice for login**, and **Google Gemini (2.5 Flash)** for AI-powered task title suggestions.

This project demonstrates **microservice architecture**, **clean folder structure**, **AI integration**, **backend workflow logic**, and **complete CRUD operations**.

---

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

🧠 Problem-Solving Approach

This project required integrating multiple systems — a frontend (React), backend (Node/Express), AI model (Gemini), and a microservice (AWS Lambda).
My approach focused on breaking the project into independent modules, solving each layer cleanly, and ensuring smooth cross-communication.

1️⃣ Understanding Requirements & Breaking Down the System

I divided the assignment into 5 core components:

Task CRUD Module

Task Status Workflow

Activity Logging

AI Suggestion System (Gemini)

AWS Lambda Authentication Microservice

This helped ensure each feature had a clear responsibility and could be built + tested independently.

2️⃣ Designing a Clean Folder Structure (Scalable Architecture)

To avoid code mixing and future technical debt, I separated concerns into:

client → UI, pages, services, axios instance

server → controllers, routes, models

lambda → independent login microservice

This structure follows industry standards and makes debugging easier.

3️⃣ Solving the Task Workflow Logic

The status update rules caused errors initially.
I created a strict workflow rule-set:

Pending → In Progress → Completed


Then added validation inside the update controller to prevent invalid transitions.
This eliminated inconsistent task states.

4️⃣ Handling AI Integration Issues (Gemini API Change)

The first approach failed because:

Old gemini-pro endpoint returned no candidates

The API format had changed

Solution:

✔ Switched to Google Generative AI SDK
✔ Used latest model gemini-2.5-flash
✔ Rewrote parser for new response structure

This fixed AI output issues completely.

5️⃣ Solving AWS Lambda CORS Errors

Frontend → Lambda calls were blocked due to missing CORS headers.

Error seen:

Access to fetch has been blocked by CORS policy


To fix:

✔ Added OPTIONS handler
✔ Added Access-Control-Allow-Headers: *
✔ Updated Lambda Function URL settings

After this, login worked from frontend → AWS without backend involvement.

6️⃣ Debugging API Routing Issues

Frontend was calling:

/ai/suggest-title


Backend route was:

/api/ai/suggest-title


Causing 404 Route Not Found.

Solution:

✔ Added axiosInstance with baseURL
✔ Ensured consistent API prefix

This fixed all AI request failures.

7️⃣ Ensuring Data Consistency with Activity Logs

Activity Logs needed to record:

old → new status

old → new field values

timestamps

Created a unified logging service that handled:

Create

Update

Status change

Delete

This ensured full traceability of user actions.

8️⃣ Deployment Problem Solving
Backend (Render)

Issues:

Build failing

CORS mismatch between Render & Vercel

Solutions:

✔ Updated CORS to allow deployed frontend URL
✔ Ensured /api prefix works in production
✔ Used environment variables correctly

Frontend (Vercel)

Problems:

Refresh returned 404

Proxy requests not hitting backend

Solutions:

✔ Set correct VITE_API_URL for production
✔ Enabled SPA fallback on Vercel
✔ Verified routes in build logs

9️⃣ Testing Strategy

I tested the system using:

Postman (backend & Lambda endpoints)

Browser console logs

Edge cases (invalid status updates, missing fields, AI empty response)

This ensured every module worked independently before integration.

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



