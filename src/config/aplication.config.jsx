
// import 'dotenv/config';

export default {
  name: 'CoolApp',
  version: '1.0.0',
  extra: {
    firebaseRealtimeDbUri: process.env.FIREBASE_REALTIME_DB,
    firebaseAuthLogin: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.FIREBASE_PROJECT_API_KEY,
    firebaseAuthSignUp: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.FIREBASE_PROJECT_API_KEY,
    firebaseCheckSecureToken: "",
    googleCloudPlatformApiKey: process.env.GOOGLE_CLOUD_PLATFORM_API_KEY,
    googleCloudPlatformStaticMapsApi: `https://maps.googleapis.com/maps/api/staticmap?center=%LATITUDE%,%LONGITUDE%&zoom=%MAP_ZOOM%&size=%MAP_WIDTH%x%MAP_HEIGHT%&markers=color:red%7Clabel:L%7C%LATITUDE%,%LONGITUDE%&key=${process.env.GOOGLE_CLOUD_PLATFORM_API_KEY}`,
    googleCloudPlatformGeoCodeLatLngApi: `https://maps.googleapis.com/maps/api/geocode/json?latlng=%LATITUDE%,%LONGITUDE%&key=${process.env.GOOGLE_CLOUD_PLATFORM_API_KEY}`,
    googleCloudPlatformGeoCodeAdressApi: `https://maps.googleapis.com/maps/api/geocode/json?address=%ADRESS%&key=${process.env.GOOGLE_CLOUD_PLATFORM_API_KEY}`,
    googleCloudPlatformPlacesAutoCompleteApi: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=%PLACES_INPUT%&language=es&types=geocode&key=${process.env.GOOGLE_CLOUD_PLATFORM_API_KEY}`,
    cleanAsyncStorage: process.env.CLEAN_ASYNC_STORAGE == 1,
    mapHeight: 300,
    mapWidth: 300,
    mapZoom: 17,
    defaultLocationImage: "https://images.adsttc.com/media/images/5d34/e507/284d/d109/5600/0240/newsletter/_FI.jpg?1563747560"
  },
  db: "1123123"
};