import {config} from '@/config/Config'
import Http from '@/plugins/Http'

const createRoles = (payload) => (
  (payload.createdBy = window?.keycloak?.tokenParsed?.preferred_username || 'system'),
  Http.post(`${config.api.cmsBackend}/roles/add`, payload)
)

const updateRoles = (id, payload) =>
  Http.post(`${config.api.cmsBackend}/roles/update/${id}`, payload)

const getRoles = () => Http.get(`${config.api.cmsBackend}/roles`)

const getRoleById = (id) => Http.get(`${config.api.cmsBackend}/roles/${id}`)

export default { createRoles, updateRoles, getRoles, getRoleById }
