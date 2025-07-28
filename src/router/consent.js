import TemplateDetail from '@/views/pages/content/ContentTemplateDetail.vue'
import ConsentView from '../views/ConsentView.vue'
import ConsentRecordList from '@/views/pages/consent_records/ConsentRecordList.vue'
import ConsentRecordCreate from '@/views/pages/consent_records/ConsentRecordCreate.vue'
import ConsentRecordDetail from '@/views/pages/consent_records/ConsentRecordDetail.vue'
import ConsentRecordEdit from '@/views/pages/consent_records/ConsentRecordEdit.vue'

const consent = [
  {
    path: '/consent-records',
    name: 'consent-records',
    component: ConsentRecordList,
  },
  {
    path: '/consent-records/create',
    name: 'consent-records-create',
    component: ConsentRecordCreate,
  },
  {
    path: '/consent-records/detail/:id',
    name: 'consent-records-detail',
    component: ConsentRecordDetail,
  },
  {
    path: '/consent-records/edit/:id',
    name: 'consent-records-edit',
    component: ConsentRecordEdit,
  },
  {
    path: '/consent',
    name: 'consent',
    component: ConsentView,
  },
  {
    path: '/consent/template-detail',
    name: 'TemplateDetail',
    component: TemplateDetail,
  },
]

export default consent
