# 🚘 Carvilla Mobile App

A mobile version of the Carvilla SPA, implemented in **React Native**, delivering a full-featured experience including authentication, card management, and a personalized feed—all powered by Redux and persistent storage.

---

## ⚙️ Tech Stack

- **React Native** – UI development
- **React Navigation** – Navigation system
- **Redux Toolkit** – State management
- **MMKVStorage** – Persistent data
- **Formik + Yup** – Forms & validation
- **Expo** – App runtime & development

---

## 🚀 Features

### 🧭 Navigation System

- **Auth Screens**
  - `/login`: Login for registered users
  - `/signup`: User registration
  - Access: Unauthorized users only

- **Protected Screens**
  - `/feed`: Global card feed (with filters & sorting)
  - `/profile`: Current user profile
  - `/profile/:userId`: View other users' profiles
  - Access: Authorized users only

- **Redirection Logic**
  - Unauthorized access → `/login`
  - Authenticated access to `/login` or `/signup` → `/feed`

---

### 👤 Authentication

- Login and Signup with validation
- “Remember Me” support via **AsyncStorage**
- Real-time error reset on input change
- Auto-login from local storage if remembered

---

### 📝 Cards Management

- Create, edit, update, delete, and view cards
- Add/remove cards to/from favorites
- Sort and filter cards (all vs. favorites, by date)
- Current user’s cards are editable (highlighted background)

---

### 🧑‍🤝‍🧑 User Sidebar

- List all registered users (except current)
- Navigate to other users’ profile pages
- Message if no other users available

---

### 🪄 UI Enhancements

- Custom modal for creating cards
- Scroll-to-top button in feed
- Inline validation and error hints
- Loader during initial data fetch

---

## 📦 Local Data Structure

### 👥 `allUsers`

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

🚘 allCars

[
  {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    authorId: string
  }
]

🕒 Simulated Data Fetch with Delay and Error Fallback

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
