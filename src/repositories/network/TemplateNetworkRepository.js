import { config } from '@/config/Config'
import Http from '@/plugins/Http'

const createTemplate = (payload) => Http.post(`${config.api.cmsBackend}/templates/create`, payload)

export default { createTemplate }
