import { getCurrentDate, getOneWeekBeforeDate } from '@/plugins/DateUtil'

export default class GetApprovalListRequest {
  startDate = getOneWeekBeforeDate()
  endDate = getCurrentDate()
  approvalType = null
  status = null
}
