import LoadConfigService from '@/usecases/LoadConfigService'

const getConfig = async () => {
  const config = await LoadConfigService.get()
  return {
    keycloak: {
      host: config.keycloakHost,
      realm: config.keycloakRealm,
      clientId: config.keycloakClientID,
      redirectUri: config.keycloakRedirectUri,
    },
    api: {
      cmsBackend: config.cmsBackendApi,
    },
  }
}

export default getConfig
