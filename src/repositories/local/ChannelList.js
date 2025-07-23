import SmartResponse from '@/plugins/SmartResponse'

const get = () => {
  return SmartResponse.success([
    { id: 'PROSPERA', name: 'PROSPERA' },
    { id: 'TERRA', name: 'TERRA' },
    { id: 'SITEPAT', name: 'SITEPAT' },
  ])
}

const ChannelList = {
  get,
}

export default ChannelList
