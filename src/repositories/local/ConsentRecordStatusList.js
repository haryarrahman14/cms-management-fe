import SmartResponse from '@/plugins/SmartResponse'

const get = () => {
  return SmartResponse.success([
    { id: 1, name: 'AKTIF' },
    { id: 0, name: 'TIDAK AKTIF' },
  ])
}

const ConsentRecordStatusList = {
  get,
}

export default ConsentRecordStatusList
