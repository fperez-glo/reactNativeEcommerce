
// import 'dotenv/config';
console.log("process.env.FIREBASE_PROJECT_API_KEY:",process.env.FIREBASE_PROJECT_API_KEY)
export default {
  name: 'CoolApp',
  version: '1.0.0',
  extra: {
    firebaseRealtimeDbUri: process.env.FIREBASE_REALTIME_DB,
    firebaseAuthLogin: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.FIREBASE_PROJECT_API_KEY,
    firebaseAuthSignUp: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.FIREBASE_PROJECT_API_KEY,
    firebaseCheckSecureToken: "",
    cleanAsyncStorage: process.env.CLEAN_ASYNC_STORAGE == 1
  },
  db: "1123123"
};