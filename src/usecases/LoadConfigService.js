// import LoadConfigNetworkRepository from '@/repositories/network/LoadConfigNetworkRepository'
// import LoadConfigLocalRepository from '@/repositories/local/LoadConfigLocalRepository'

// /**
//  *
//  * @returns {Promise<ResponseStruct|*>}
//  */
// const get = async () => {
//   const LoadConfigLocal = LoadConfigNetworkRepository()

//   let result = await LoadConfigLocal.get()
//   if (typeof result === 'undefined') {
//     const networkResult = await LoadConfigNetworkRepository.get()
//     if (networkResult?.data) {
//       await LoadConfigLocal.store(networkResult.data)
//       return networkResult.data
//     }
//   }
//   return result
// }

// const loadConfig = () => {
//   return LoadConfigLocalRepository.get()
// }

// const LoadConfigService = {
//   get,
//   loadConfig,
// }

// export default LoadConfigService
