import { config } from '@/config/Config'
import Http from '@/plugins/Http'

const getMasterApprovalTypesList = () =>
  Http.get(`${config.api.cmsBackend}/approvals/get-approval-types`)

const getApprovalsList = (payload) =>
  Http.get(`${config.api.cmsBackend}/approvals/get-list`, payload)

const getApprovalDetail = (payload) =>
  Http.get(`${config.api.cmsBackend}/approvals/get-detail`, payload)

const rejectApproval = (id, payload) =>
  Http.post(`${config.api.cmsBackend}/approvals/reject?id=${id}`, payload)

const approveApproval = (id, payload) =>
  Http.post(`${config.api.cmsBackend}/approvals/approve?id=${id}`, payload)

export default {
  getApprovalsList,
  getMasterApprovalTypesList,
  getApprovalDetail,
  rejectApproval,
  approveApproval,
}
