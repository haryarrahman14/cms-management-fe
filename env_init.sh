echo "{
  \"keycloakHost\": \"${VITE_KEYCLOAK_HOST}\",
  \"keycloakRealm\": \"${VITE_KEYCLOAK_REALM}\",
  \"keycloakRedirectUri\": \"${VITE_KEYCLOAK_REDIRECT_URI}\",
  \"keycloakClientID\": \"${VITE_KEYCLOAK_CLIENT_ID}\",
  \"cmsBackendApi\": \"${VITE_CMS_BACKEND_API}\"
}" > /usr/share/nginx/html/config.json
