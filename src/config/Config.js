import LoadConfigService from '@/usecases/LoadConfigService'

let LoadConfig = LoadConfigService.loadConfig()

const Config = {
  app: {
    testEnv: LoadConfig.testEnv,
  },
}

export default Config
