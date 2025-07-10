import LoadConfigService from '@/usecases/LoadConfigService'

const LoadConfig = LoadConfigService.loadConfig()

if (!LoadConfig) {
  window.location.reload()
}

const getConfig = async () => {
  const config = await LoadConfigService.get()
  return {
    keycloak: {
      host: LoadConfig.keycloakHost,
      realm: LoadConfig.keycloakRealm,
      clientId: LoadConfig.keycloakClientID,
      redirectUri: LoadConfig.keycloakRedirectUri,
    },
    api: {
      cmsBackend: LoadConfig.cmsBackendApi,
    },
  }
}

export default getConfig
