import { config } from '@/config/Config'
import Http from '@/plugins/Http'

const getConsentSubmissions = (payload) =>
  Http.get(`${config.api.cmsBackend}/consent-submissions`, payload)

const getConsentSubmissionHistory = (consentId, payload) =>
  Http.get(`${config.api.cmsBackend}/consent-submissions/update/${consentId}/history`, payload)

const getConsentSubmissionDetail = (consentId, payload) =>
  Http.get(`${config.api.cmsBackend}/consent-submissions/detail/${consentId}`, payload)

const submitConsentSubmission = (payload) =>
  Http.post(`${config.api.cmsBackend}/consent-submissions/submit`, payload)

const updateConsentSubmission = (consentId, payload) =>
  Http.put(`${config.api.cmsBackend}/consent-submissions/update/${consentId}`, payload)

export default {
  getConsentSubmissions,
  getConsentSubmissionHistory,
  getConsentSubmissionDetail,
  submitConsentSubmission,
  updateConsentSubmission,
}
