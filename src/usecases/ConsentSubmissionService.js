import Lazy from '@/plugins/Lazy'
import ConsentSubmissionNetworkRepository from '@/repositories/network/ConsentSubmissionNetworkRepository'
import {
  ConsentDecisionRequest,
  GetConsentSubmissionRequest,
  SubmitConsentSubmissionRequest,
  UpdateConsentSubmissionRequest,
} from '@/structs/networks/request/ConsentSubmissionRequest'
import {
  ConsentFormResponse,
  ConsentDecisionResponse,
  ConsentSectionResponse,
  GetConsentSubmissionResponse,
  GetConsentSubmissionDetailResponse,
  GetConsentSubmissionHistoryResponse,
  SubmitConsentSubmissionResponse,
  UpdateConsentSubmissionResponse,
} from '@/structs/networks/response/ConsentSubmissionsResponse'
import Format from '@/plugins/Format.js'
import { useAppQuery, useAppMutation, createQueryKey } from '@/plugins/QueryPlugin'
import ConsentRecordStatusList from '@/repositories/local/ConsentRecordStatusList'
import { unref } from 'vue'

const CONSENT_SUBMISSION_QUERY_KEY = 'consent-submissions'
const CONSENT_SUBMISSION_HISTORY_QUERY_KEY = 'consent-submission-history'
const CONSENT_SUBMISSION_DETAIL_QUERY_KEY = 'consent-submission-detail'
const CONSENT_RECORD_STATUS_LIST_QUERY_KEY = 'consent-record-status-list'

const dateFormatter = (key, value) => {
  return key.toLowerCase().includes('date') ? Format.dateLabelFormat(value) : value
}

const getConsentSubmissions = async (payload) => {
  const request = await Lazy.transform(payload, new GetConsentSubmissionRequest())
  const cleanedRequest = Lazy.removeEmptyValues(request)
  const response = await ConsentSubmissionNetworkRepository.getConsentSubmissions(cleanedRequest)
  if (response.code === 200) {
    response.data = await Promise.all(
      response.data.map(async (submission, index) => {
        const responseObj = await Lazy.transform(submission, new GetConsentSubmissionResponse())
        // consentForm
        responseObj.consentForm = await Lazy.transform(
          submission.consentForm,
          new ConsentFormResponse(),
        )
        // decisions
        responseObj.decisions = await Promise.all(
          (submission.decisions || []).map(async (decision) => {
            const d = await Lazy.transform(decision, new ConsentDecisionResponse())
            // section
            if (d.consentSection) {
              d.consentSection = await Lazy.transform(
                d.consentSection,
                new ConsentSectionResponse(),
              )
            }
            return d
          }),
        )
        Lazy.formatValues(responseObj, dateFormatter)
        return { ...responseObj, no: index + 1 }
      }),
    )
  }
  return response
}

const getConsentSubmissionHistory = async (consentId) => {
  const response = await ConsentSubmissionNetworkRepository.getConsentSubmissionHistory(consentId)
  if (response.code === 200) {
    response.data = await Promise.all(
      response.data.map(async (history, index) => {
        const responseObj = await Lazy.transform(history, new GetConsentSubmissionHistoryResponse())
        Lazy.formatValues(responseObj, dateFormatter)
        return { ...responseObj, no: index + 1 }
      }),
    )
  }
  return response
}

const getConsentSubmissionDetail = async (consentId) => {
  const response = await ConsentSubmissionNetworkRepository.getConsentSubmissionDetail(consentId)
  if (response.code === 200) {
    const responseObj = await Lazy.transform(
      response.data,
      new GetConsentSubmissionDetailResponse(),
    )
    // consentForm
    responseObj.consentForm = await Lazy.transform(
      response.data.consentForm,
      new ConsentFormResponse(),
    )
    // decisions
    responseObj.decisions = await Promise.all(
      (response.data.decisions || []).map(async (decision) => {
        const d = await Lazy.transform(decision, new ConsentDecisionResponse())
        if (d.consentSection) {
          d.consentSection = await Lazy.transform(d.consentSection, new ConsentSectionResponse())
        }
        return d
      }),
    )
    Lazy.formatValues(responseObj, dateFormatter)
    response.data = responseObj
  }
  return response
}

const submitConsentSubmission = async (payload) => {
  const request = await Lazy.transform(payload, new SubmitConsentSubmissionRequest())
  request.decisions = await Promise.all(
    request.decisions.map(async (decision) => {
      const d = await Lazy.transform(decision, new ConsentDecisionRequest())
      return d
    }),
  )
  const response = await ConsentSubmissionNetworkRepository.submitConsentSubmission(request)
  if (response.code === 200) {
    const responseObj = await Lazy.transform(response.data, new SubmitConsentSubmissionResponse())
    // consentForm
    responseObj.consentForm = await Lazy.transform(
      response.data.consentForm,
      new ConsentFormResponse(),
    )
    // decisions
    responseObj.decisions = await Promise.all(
      (response.data.decisions || []).map(async (decision) => {
        const d = await Lazy.transform(decision, new ConsentDecisionResponse())
        // section
        if (d.consentSection) {
          d.consentSection = await Lazy.transform(d.consentSection, new ConsentSectionResponse())
        }
        return d
      }),
    )
    Lazy.formatValues(responseObj, dateFormatter)
    response.data = responseObj
  }
  return response
}

const updateConsentSubmission = async (consentId, payload) => {
  const request = await Lazy.transform(payload, new UpdateConsentSubmissionRequest())
  request.decisions = await Promise.all(
    request.decisions.map(async (decision) => {
      const d = await Lazy.transform(decision, new ConsentDecisionRequest())
      return d
    }),
  )
  const response = await ConsentSubmissionNetworkRepository.updateConsentSubmission(
    consentId,
    request,
  )
  if (response.code === 200) {
    const responseObj = await Lazy.transform(response.data, new UpdateConsentSubmissionResponse())
    // consentForm
    responseObj.consentForm = await Lazy.transform(
      response.data.consentForm,
      new ConsentFormResponse(),
    )
    // decisions
    responseObj.decisions = await Promise.all(
      (response.data.decisions || []).map(async (decision) => {
        const d = await Lazy.transform(decision, new ConsentDecisionResponse())
        if (d.consentSection) {
          d.consentSection = await Lazy.transform(d.consentSection, new ConsentSectionResponse())
        }
        return d
      }),
    )
    Lazy.formatValues(responseObj, dateFormatter)
    response.data = responseObj
  }
  return response
}

// Utility: getSectionDepth
const getSectionDepth = (section, sections) => {
  if (!section.parentSectionId || !sections) return 1
  let depth = 1
  let currentParentId = section.parentSectionId
  while (currentParentId) {
    depth++
    const parentSection = sections.find((s) => s.consentSectionId === currentParentId)
    currentParentId = parentSection?.parentSectionId || null
    if (depth > 10) break
  }
  return depth
}

const useGetSectionDepth = (sectionsRef) => {
  return (section) => {
    return getSectionDepth(section, unref(sectionsRef))
  }
}

const useGetConsentSubmissions = (payload, options = {}) => {
  return useAppQuery(createQueryKey(CONSENT_SUBMISSION_QUERY_KEY, payload), getConsentSubmissions, {
    payload,
    initialData: [],
    ...options,
  })
}

const useGetConsentSubmissionHistory = (consentId, options = {}) => {
  return useAppQuery(
    createQueryKey(CONSENT_SUBMISSION_HISTORY_QUERY_KEY, consentId),
    getConsentSubmissionHistory,
    {
      payload: consentId,
      initialData: [],
      ...options,
    },
  )
}

const useGetConsentSubmissionDetail = (consentId, options = {}) => {
  return useAppQuery(
    createQueryKey(CONSENT_SUBMISSION_DETAIL_QUERY_KEY, consentId),
    getConsentSubmissionDetail,
    {
      payload: consentId,
      initialData: {},
      ...options,
    },
  )
}

const useSubmitConsentSubmission = (options = {}) => {
  return useAppMutation(submitConsentSubmission, {
    invalidateQueries: [[CONSENT_SUBMISSION_QUERY_KEY]],
    ...options,
  })
}

const useUpdateConsentSubmission = (consentId, options = {}) => {
  return useAppMutation((payload) => updateConsentSubmission(unref(consentId), payload), {
    invalidateQueries: [
      [CONSENT_SUBMISSION_DETAIL_QUERY_KEY, consentId],
      [CONSENT_SUBMISSION_QUERY_KEY],
    ],
    ...options,
  })
}

const useGetConsentRecordStatusList = (options = {}) => {
  return useAppQuery([CONSENT_RECORD_STATUS_LIST_QUERY_KEY], () => ConsentRecordStatusList.get(), {
    initialData: [],
    ...options,
  })
}

export default {
  useGetConsentSubmissions,
  useGetConsentSubmissionHistory,
  useGetConsentSubmissionDetail,
  useSubmitConsentSubmission,
  useUpdateConsentSubmission,
  useGetConsentRecordStatusList,

  // Utility hooks
  useGetSectionDepth,
}
