import Config from '@/config/Config'
import Http from '@/plugins/Http'

const createTemplate = (payload) => Http.post(`${Config.api.cmsBackend}/templates/create`, payload)

export default { createTemplate }
