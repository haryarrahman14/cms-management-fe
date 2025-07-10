import TemplateNetworkRepository from '@/repositories/network/TemplateNetworkRepository'

const createTemplate = (payload) => {
  const transformedClauses = payload.clauses.map((clause, index) => {
    delete clause['id']
    clause.order = index + 1
    return clause
  })
  return TemplateNetworkRepository.createTemplate({ ...payload, transformedClauses })
}

export default { createTemplate }
