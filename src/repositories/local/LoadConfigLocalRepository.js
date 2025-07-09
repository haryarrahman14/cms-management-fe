import Store from 'store'

const localTable = 'config'

const store = async (config) => {
  Store.set(localTable, config)
}

const get = () => {
  return Store.get(localTable)
}

const LoadConfigLocalRepository = {
  store,
  get,
}

export default LoadConfigLocalRepository
