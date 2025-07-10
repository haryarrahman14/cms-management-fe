import Keycloak from 'keycloak-js'
import getConfig from '@/config/Config'

const initializeKeycloak = async () => {
  const config = await getConfig()
  console.log('config', config)
  const keycloak = new Keycloak({
    url: config.keycloak.host,
    realm: config.keycloak.realm,
    clientId: config.keycloak.clientId,
    redirectUri: config.keycloak.redirectUri,
  })
  return new Promise((resolve, reject) => {
    keycloak
      .init({ onLoad: 'login-required' })
      .then((authenticated) => {
        if (authenticated) {
          resolve(keycloak)
        } else {
          reject('Not authenticated')
        }
      })
      .catch(reject)
  })
}

export { initializeKeycloak }
