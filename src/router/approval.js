import Approval from '@/views/pages/approvals/Approval.vue'
import ApprovalDetail from '@/views/pages/approvals/ApprovalDetail.vue'

const approval = [
  {
    path: '/approvals',
    name: 'Approval',
    component: Approval,
  },
  {
    path: '/approvals/detail/:id',
    name: 'ApprovalDetail',
    component: ApprovalDetail,
  },
]

export default approval
