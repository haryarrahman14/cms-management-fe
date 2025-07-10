import {config} from '@/config/Config'
import Http from '@/plugins/Http'

const createUser = (payload) => Http.post(`${config.api.cmsBackend}/users/create-user`, payload)

const createAgent = (payload) => Http.post(`${config.api.cmsBackend}/users/create-agent`, payload)

const getUsers = (userType) => Http.get(`${config.api.cmsBackend}/users/get-by-type/${userType}`)

export default { createUser, createAgent, getUsers }
