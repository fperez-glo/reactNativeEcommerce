
// import 'dotenv/config';

export default {
  name: 'CoolApp',
  version: '1.0.0',
  extra: {
    firebaseRealtimeDbUri: process.env.FIREBASE_REALTIME_DB,
    firebaseApiKey: process.env.FIREBASE_PROJECT_API_KEY,
  },
  db: "1123123"
};