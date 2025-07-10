import TemplateNetworkRepository from '@/repositories/network/TemplateNetworkRepository'

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

export default { createTemplate, getTemplates }
