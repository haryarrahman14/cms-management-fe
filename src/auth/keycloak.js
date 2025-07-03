import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'http://localhost:8080/', // sesuaikan URL Keycloak Anda
  realm: 'cmsrealm',
  clientId: 'cms-client',
})

const initializeKeycloak = () =>
  new Promise((resolve, reject) => {
    keycloak
      .init({ onLoad: 'login-required' }) // otomatis redirect ke login
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
