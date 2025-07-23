import { config } from '@/config/Config'
import Http from '@/plugins/Http'

const createTemplate = (payload) => Http.post(`${config.api.cmsBackend}/templates/create`, payload)

const getTemplates = (payload) => Http.get(`${config.api.cmsBackend}/templates`, payload)

const getTemplateDetail = (id) => Http.get(`${config.api.cmsBackend}/templates/detail/${id}`)

export default { createTemplate, getTemplates, getTemplateDetail, getTemplateDetail }
