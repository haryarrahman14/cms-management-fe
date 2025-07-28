import LoadConfigService from '@/usecases/LoadConfigService'

export let config = {}

/**
 * To be called once and once only on main.js
 * @returns
 */
export const loadConfig = async () => {
  const configResp = await LoadConfigService.get()
  config = {
    keycloak: {
      host: configResp.keycloakHost,
      realm: configResp.keycloakRealm,
      clientId: configResp.keycloakClientID,
      redirectUri: configResp.keycloakRedirectUri,
    },
    api: {
      cmsBackend: '/api/cms-management',
    },
  }
  return config
}
