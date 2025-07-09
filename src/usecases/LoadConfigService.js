import LoadConfigNetworkRepository from '@/repositories/network/LoadConfigNetworkRepository'
import LoadConfigLocalRepository from '@/repositories/local/LoadConfigLocalRepository'

/**
 *
 * @returns {Promise<ResponseStruct|*>}
 */
const get = () => {
  let result = loadConfig()
  if (typeof result === 'undefined') {
    result = LoadConfigNetworkRepository.get()
    if (typeof result.data !== 'undefined') {
      LoadConfigLocalRepository.store(result.data)
      return result.data
    }
  }
  return result
}
const loadConfig = () => {
  return LoadConfigLocalRepository.get()
}

const LoadConfigService = {
  get,
  loadConfig,
}

export default LoadConfigService
