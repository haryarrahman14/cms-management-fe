echo "{
  \"dateLongFormat\": \"${VITE_DATE_LONG_FORMAT}\",
  \"rwKey\": \"${VITE_API_KEY_ROUTER_WEB}\",
  \"messageTopic\": \"${VITE_MESSAGE_TOPIC}\",
  \"keycloakHost\": \"${VITE_KEYCLOAK_HOST}\",
  \"keycloakRealm\": \"${VITE_KEYCLOAK_REALM}\",
  \"keycloakRedirectUri\": \"${VITE_KEYCLOAK_REDIRECT_URI}\",
  \"keycloakClientID\": \"${VITE_KEYCLOAK_CLIENT_ID}\",
  \"firebaseApiKey\": \"${VITE_FIREBASE_API_KEY}\",
  \"firebaseAuthDomain\": \"${VITE_FIREBASE_AUTH_DOMAIN}\",
  \"firebaseProjectId\": \"${VITE_FIREBASE_PROJECT_ID}\",
  \"firebaseStorageBucket\": \"${VITE_FIREBASE_STORAGE_BUCKET}\",
  \"firebaseMessagingSenderId\": \"${VITE_FIREBASE_MESSAGING_SENDER_ID}\",
  \"firebaseAppId\": \"${VITE_FIREBASE_APP_ID}\",
  \"firebaseMeasurementId\": \"${VITE_FIREBASE_MEASUREMENT_ID}\",
  \"firebaseVapidKey\": \"${VITE_FIREBASE_VAPID_KEY}\",
  \"testEnv\": \"${VITE_TEST_ENV}\"
}" > /usr/share/nginx/html/config.json
