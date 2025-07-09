echo "{
  \"dateLongFormat\": \"${VITE_DATE_LONG_FORMAT}\",
  \"rwKey\": \"${VITE_API_KEY_ROUTER_WEB}\",
  \"messageTopic\": \"${VITE_MESSAGE_TOPIC}\",
  \"keycloakHost\": \"${VITE_KEYCLOAK_HOST}\",
  \"keycloakRealm\": \"${VITE_KEYCLOAK_REALM}\",
  \"keycloakRedirectUri\": \"${VITE_KEYCLOAK_REDIRECT_URI}\",
  \"keycloakClientID\": \"${VITE_KEYCLOAK_CLIENT_ID}\",
  \"testEnv\": \"${VITE_TEST_ENV}\"
}" > /usr/share/nginx/html/config.json
