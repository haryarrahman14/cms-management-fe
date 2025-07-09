import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: 'https://accounts-nww.twprisma.com/auth',
  realm: 'dirty',
  clientId: 'cms-management-fe',
  redirectUri: 'https://cms-management-fe-cms-dirty.apps.btpnsdev1.c3vu.p1.openshiftapps.com/auth/callback',
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
