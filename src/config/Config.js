import LoadConfigService from '@/usecases/LoadConfigService'

const LoadConfig = LoadConfigService.loadConfig()

console.log('loadConfig', LoadConfig)

const Config = {
  app: {
    testEnv: LoadConfig.testEnv,
  },
}

export default Config
