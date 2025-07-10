import Keycloak from 'keycloak-js'
import getConfig from '@/config/Config'

const config = await getConfig()

const keycloak = new Keycloak({
  url: config.keycloak.host,
  realm: config.keycloak.realm,
  clientId: config.keycloak.clientId,
  redirectUri: config.keycloak.redirectUri,
})

const initializeKeycloak = () =>
  new Promise((resolve, reject) => {
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

export { keycloak, initializeKeycloak }
