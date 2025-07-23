import TemplateNetworkRepository from '@/repositories/network/TemplateNetworkRepository'
import { useAppQuery, useAppMutation, createQueryKey } from '@/plugins/QueryPlugin'

const TEMPLATE_QUERY_KEY = 'templates'
const TEMPLATE_DETAIL_QUERY_KEY = 'template-detail'

const createTemplate = (payload) => {
  const transformedClauses = payload.clauses.map((clause, index) => {
    delete clause['id']
    clause.order = index + 1
    return clause
  })
  return TemplateNetworkRepository.createTemplate({ ...payload, transformedClauses })
}

const getTemplates = async (payload) => {
  const response = await TemplateNetworkRepository.getTemplates(payload)
  if (response.code === 200) {
    response.data = response.data.map((template, index) => {
      return { ...template, no: index + 1, status: template.status === 1 ? 'Aktif' : 'Tidak Aktif' }
    })
  }
  return response
}

const getTemplateDetail = async (id) => {
  const response = await TemplateNetworkRepository.getTemplateDetail(id)
  return response
}

const useGetTemplates = (payload, options = {}) => {
  return useAppQuery(createQueryKey(TEMPLATE_QUERY_KEY, payload), getTemplates, {
    payload,
    initialData: [],
    ...options,
  })
}

const useGetTemplateDetail = (id, options = {}) => {
  return useAppQuery(createQueryKey(TEMPLATE_DETAIL_QUERY_KEY, id), getTemplateDetail, {
    payload: id,
    initialData: null,
    ...options,
  })
}

const useCreateTemplate = (options = {}) => {
  return useAppMutation(createTemplate, {
    invalidateQueries: [[TEMPLATE_QUERY_KEY]],
    ...options,
  })
}

export default {
  createTemplate,
  getTemplates,
  getTemplateDetail,

  useGetTemplates,
  useGetTemplateDetail,
  useCreateTemplate,
}
