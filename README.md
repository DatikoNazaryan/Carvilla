# 📱 Carvilla Mobile App

**Carvilla** is a mobile version of the Carvilla SPA, implemented in React Native. It offers user authentication, car management, and personalized content feeds—all optimized for mobile devices.

---

## ⚙️ Tech Stack

- **React Native** – UI development  
- **React Navigation** – Navigation system  
- **Redux Toolkit** – State management  
- **AsyncStorage** – Persistent storage  
- **Formik + Yup** – Forms and validation  

---

## 🚀 Features

### 🧭 Navigation System

#### 🔓 Auth Screens (accessible only to unauthorized users)
- `/login` – Login form
- `/signup` – Registration form

#### 🔐 Protected Screens (accessible only to authorized users)
- `/feed` – Global card feed with filters and sorting
- `/profile` – Current user profile
- `/profile/:userId` – View another user's profile

#### 🔁 Redirection Rules
- Unauthorized users accessing any protected route are redirected to `/login`
- Authorized users accessing `/login` or `/signup` are redirected to `/feed`

---

### 👤 Authentication

- Login and signup with real-time validation
- "Remember Me" functionality using `AsyncStorage`
- Errors disappear on input change for better UX

---

### 🚗 Card Management

- Create, view, edit, delete, and search cards
- Favorite/unfavorite cards
- Filter and sort by creation date
- User's own cards are editable with different styling

---

### 🧑‍🤝‍🧑 Users Sidebar

- Sidebar listing all users except the current one
- Tapping a user navigates to their profile
- Message shown if no other users exist

---

### 🪄 UI Highlights

- Custom modal for creating cards
- Scroll-to-top button appears on long lists
- Friendly error messages and validation notices
- Loader shown while fetching data

---

## 📦 Local Data Structure

### AsyncStorage Keys

#### 🧍‍♂️ `allUsers`

```ts
[
  {
    id: string,
    name: string,
    email: string,
    password: string,
    cardIds: string[],
    favoriteIds: string[]
  }
]

---

#### 🧍‍♂️ 🚘 `allCars`

```ts

[
  {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    authorId: string
  }
]

---

#### 🧍‍♂️ 🕒 ` Simulated Data Fetch with Delay and Error Fallback`

```ts

function fakeFetch(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.random();
      if (randomNum < 0.3) reject();

      const result = AsyncStorage.getItem(key);
      if (!result) {
        AsyncStorage.setItem(key, '[]');
        resolve([]);
      }

      resolve(JSON.parse(result));
    }, 2000);
  });
}
