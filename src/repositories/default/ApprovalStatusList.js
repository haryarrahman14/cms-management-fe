import SmartResponse from '@/plugins/SmartResponse'

const get = () => {
  return SmartResponse.success([
    { id: 3, name: 'Ditolak' },
    { id: 4, name: 'Disetujui' },
    { id: 2, name: 'Menunggu Persetujuan' },
  ])
}

const ApprovalStatusList = {
  get,
}

export default ApprovalStatusList
