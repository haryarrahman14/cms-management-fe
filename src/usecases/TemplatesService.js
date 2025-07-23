import TemplateNetworkRepository from '@/repositories/network/TemplateNetworkRepository'
import { useQuery } from '@tanstack/vue-query'
import { isRef } from 'vue'

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

const useGetTemplates = (payload, options = {}, formatter = (data) => data) => {
  return useQuery({
    queryKey: [TEMPLATE_QUERY_KEY, payload],
    initialData: [],
    queryFn: async () => {
      const response = await getTemplates(isRef(payload) ? payload.value : payload)
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

const useGetTemplateDetail = (id, options = {}, formatter = (data) => data) => {
  return useQuery({
    initialData: null,
    queryKey: [TEMPLATE_DETAIL_QUERY_KEY, id],
    queryFn: async () => {
      const response = await getTemplateDetail(isRef(id) ? id.value : id)
      if (response.code !== 200) {
        throw new Error(response.message)
      }
      return formatter(response.data)
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
    ...options,
  })
}

export default {
  createTemplate,
  getTemplates,
  getTemplateDetail,

  useGetTemplates,
  useGetTemplateDetail,
}
