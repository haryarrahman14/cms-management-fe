import Keycloak from 'keycloak-js'
import Config from '@/config/Config'

const keycloak = new Keycloak({
  url: Config.keycloak.host,
  realm: Config.keycloak.realm,
  clientId: Config.keycloak.clientId,
  redirectUri: Config.keycloak.redirectUri,
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
