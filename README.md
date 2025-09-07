# To-Do App (Frontend)

This is the frontend of a full-stack **To-Do application**, built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **Axios**.  
It connects to a backend API (NestJS) to manage To-Do items.

---

## Features

- Display list of To-Dos
- Filter by status: `PENDING`, `IN_PROGRESS`, `DONE`
- Create new To-Do items
- Mark To-Dos as **In Progress** or **Done**
- Delete To-Dos
- Activity log for user actions
- Responsive UI using Tailwind CSS
- JWT authentication support

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **HTTP Requests:** Axios
- **State Management:** React `useState` & `useEffect`

---

## Prerequisites

- Node.js >= 20
- npm >= 9
- Backend API running and accessible

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd frontend  ```

### 2. Install dependencies

```bash
npm install  ```

### 3. create .env.local file and setup value

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_JWT_TOKEN=  ``

### 4. Create a .env.local file in the root of the frontend project and setup values

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_JWT_TOKEN=<your-jwt-token> ```

### 5. Run the development server

```bash
npm run  build
npm run  start ```



