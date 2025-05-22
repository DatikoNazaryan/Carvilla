:

📱 Carvilla Mobile App
A mobile version of the Carvilla SPA implemented with React Native, providing user authentication, car management, and personalized content feeds.

⚙️ Tech Stack
React Native – UI development

React Navigation – Navigation system

Redux Toolkit – State management

AsyncStorage – Persistent storage

Formik + Yup – Forms & validation

🚀 Features
🧭 Navigation System
Auth Screens:

/login: Login form for registered users

/signup: Registration form

Only accessible to unauthorized users

Protected Screens:

/feed: Global cad feed with sorting/filtering

/profile: Current user profile

/profile/:userId: View other users' profiles

Only accessible to authorized users

Redirection rules:

Unauthorized users are redirected to /login

Authorized users trying to access /login or /signup are redirected to /feed

👤 Authentication
Login and signup with form validation

“Remember Me” option using AsyncStorage

Real-time error clearing when inputs change

📝 Cards Management
Create, edit, search, update, delete and view cars

Add cards to favorites

Sort and filter cars

Cards owned by the current user are editable

🧑‍🤝‍🧑 Users
Sidebar with a list of users (excluding current)

Navigate to profiles and view user-specific cars

🪄 UI Highlights
Custom modal for creating cards

Persistent scroll-to-top button in feed

Friendly error messages and validation notices

Loader during initial data fetch

📦 Local Data Structure
AsyncStorage Keys:
allUsers:

ts
Копировать
Редактировать
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
allCars:

ts
Копировать
Редактировать
[
  {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    authorId: string
  }
]
Data is loaded using a simulated delay with error fallback:

ts
Копировать
Редактировать
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
🛠 Installation & Run
bash
Копировать
Редактировать
git clone https://github.com/your-username/magiccards-mobile
cd magiccards-mobile
npm install
npx expo start
