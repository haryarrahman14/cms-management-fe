import LoadConfigService from '@/usecases/LoadConfigService'

const LoadConfig = LoadConfigService.loadConfig()

console.log('loadConfig', LoadConfig)

const Config = {
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

export default Config
