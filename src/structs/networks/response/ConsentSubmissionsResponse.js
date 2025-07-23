export class ConsentDecisionResponse {
  /**
   * Consent decision id
   * @type {Number}
   */
  consentDecisionId = null

  /**
   * Consent section id
   * @type {Number}
   */
  consentSectionId = null

  /**
   * Consent record id
   * @type {Number}
   */
  consentRecordId = null

  /**
   * Whether the consent is accepted
   * @type {Boolean}
   */
  accepted = null

  /**
   * Consent section details
   * @type {ConsentSectionResponse}
   */
  consentSection = null

  /**
   * Created date
   * @type {String}
   */
  createdDate = ''

  /**
   * Created by user id
   * @type {String}
   */
  createdBy = ''

  /**
   * Created by user name
   * @type {String}
   */
  createdByName = ''
}

export class ConsentSectionResponse {
  /**
   * Consent section id
   * @type {Number}
   */
  consentSectionId = null

  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

  /**
   * Header
   * @type {String}
   */
  header = ''

  /**
   * Short name
   * @type {String}
   */
  shortName = ''

  /**
   * Description
   * @type {String}
   */
  description = ''

  /**
   * Order section
   * @type {Number}
   */
  orderSection = null

  /**
   * Required
   * @type {Boolean}
   */
  required = null

  /**
   * Created date
   * @type {String}
   */
  createdDate = ''

  /**
   * Created by user id
   * @type {String}
   */
  createdBy = ''

  /**
   * Parent section id
   * @type {Number}
   */
  parentSectionId = null
}

export class ConsentFormResponse {
  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

  /**
   * Title
   * @type {String}
   */
  title = ''

  /**
   * Version
   * @type {Number}
   */
  version = null

  /**
   * Description
   * @type {String}
   */
  description = ''

  /**
   * Created date
   * @type {String}
   */
  createdDate = ''

  /**
   * Created by user id
   * @type {String}
   */
  createdBy = ''

  /**
   * Status
   * @type {Number}
   */
  status = null

  /**
   * Category
   * @type {String}
   */
  category = ''

  /**
   * Approved date
   * @type {String}
   */
  approvedDate = ''

  /**
   * Approved by user id
   * @type {String}
   */
  approvedBy = ''

  /**
   * Effective date
   * @type {String}
   */
  effectiveDate = ''

  /**
   * Expired date
   * @type {String}
   */
  expiredDate = ''

  /**
   * Parent form id
   * @type {Number}
   */
  parentFormId = null
}

export class GetConsentSubmissionResponse {
  /**
   * Consent submission id
   * @type {Number}
   */
  id = null

  /**
   * Submit date
   * @type {String}
   */
  submitDate = ''

  /**
   * Submitted by user id
   * @type {String}
   */
  submittedBy = ''

  /**
   * Channel (e.g., 'PROSPERA', 'TERRA', 'SITEPAT')
   * @type {String}
   */
  channel = ''

  /**
   * User channel
   * @type {String}
   */
  userChannel = ''

  /**
   * Customer Information File
   * @type {String}
   */
  cif = ''

  /**
   * Status
   * @type {Number}
   */
  status = null

  /**
   * Agent
   * @type {String}
   */
  agent = ''

  /**
   * User agent
   * @type {String}
   */
  userAgent = ''

  /**
   * Type
   * @type {Number}
   */
  type = null

  /**
   * Version
   * @type {Number}
   */
  version = null

  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

  /**
   * Consent form details
   * @type {ConsentFormResponse}
   */
  consentForm = null

  /**
   * List of consent decisions
   * @type {Array<ConsentDecisionResponse>}
   */
  decisions = []

  /**
   * Approved date
   * @type {String}
   */
  approvedDate = ''

  /**
   * Approved by user id
   * @type {String}
   */
  approvedBy = ''

  /**
   * Last updated date
   * @type {String}
   */
  lastUpdatedDate = ''

  /**
   * Updated by user id
   * @type {String}
   */
  updatedBy = ''
}

export class GetConsentSubmissionDetailResponse {
  /**
   * Consent submission id
   * @type {Number}
   */
  id = null

  /**
   * Submit date
   * @type {String}
   */
  submitDate = ''

  /**
   * Submitted by user id
   * @type {String}
   */
  submittedBy = ''

  /**
   * Channel (e.g., 'PROSPERA', 'TERRA', 'SITEPAT')
   * @type {String}
   */
  channel = ''

  /**
   * User channel
   * @type {String}
   */
  userChannel = ''

  /**
   * Customer Information File
   * @type {String}
   */
  cif = ''

  /**
   * Status
   * @type {Number}
   */
  status = null

  /**
   * Agent
   * @type {String}
   */
  agent = ''

  /**
   * User agent
   * @type {String}
   */
  userAgent = ''

  /**
   * Type
   * @type {Number}
   */
  type = null

  /**
   * Version
   * @type {Number}
   */
  version = null

  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

  /**
   * Consent form details
   * @type {ConsentFormResponse}
   */
  consentForm = null

  /**
   * List of consent decisions
   * @type {Array<ConsentDecisionResponse>}
   */
  decisions = []

  /**
   * Approved date
   * @type {String}
   */
  approvedDate = ''

  /**
   * Approved by user id
   * @type {String}
   */
  approvedBy = ''

  /**
   * Last updated date
   * @type {String}
   */
  lastUpdatedDate = ''

  /**
   * Updated by user id
   * @type {String}
   */
  updatedBy = ''
}

export class GetConsentSubmissionHistoryResponse {
  /**
   * Consent history decision id (UUID)
   * @type {String}
   */
  consentHistoryDecisionId = ''

  /**
   * Consent decision id
   * @type {Number}
   */
  consentDecisionId = null

  /**
   * Before state
   * @type {Boolean}
   */
  beforeState = null

  /**
   * After state
   * @type {Boolean}
   */
  afterState = null

  /**
   * Updated date
   * @type {String}
   */
  updatedDate = ''

  /**
   * Updated by user
   * @type {String}
   */
  updatedBy = ''
}

export class SubmitConsentSubmissionResponse {
  /**
   * Consent submission id
   * @type {Number}
   */
  id = null

  /**
   * Submit date
   * @type {String}
   */
  submitDate = ''

  /**
   * Submitted by user id
   * @type {String}
   */
  submittedBy = ''

  /**
   * Channel (e.g., 'PROSPERA', 'TERRA', 'SITEPAT')
   * @type {String}
   */
  channel = ''

  /**
   * User channel
   * @type {String}
   */
  userChannel = ''

  /**
   * Customer Information File
   * @type {String}
   */
  cif = ''

  /**
   * Status
   * @type {Number}
   */
  status = null

  /**
   * Agent
   * @type {String}
   */
  agent = ''

  /**
   * User agent
   * @type {String}
   */
  userAgent = ''

  /**
   * Type
   * @type {Number}
   */
  type = null

  /**
   * Version
   * @type {Number}
   */
  version = null

  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

  /**
   * Consent form details
   * @type {ConsentFormResponse}
   */
  consentForm = null

  /**
   * List of consent decisions
   * @type {Array<ConsentDecisionResponse>}
   */
  decisions = []

  /**
   * Approved date
   * @type {String}
   */
  approvedDate = ''

  /**
   * Approved by user id
   * @type {String}
   */
  approvedBy = ''

  /**
   * Last updated date
   * @type {String}
   */
  lastUpdatedDate = ''

  /**
   * Updated by user id
   * @type {String}
   */
  updatedBy = ''
}

export class UpdateConsentSubmissionResponse {
  /**
   * Consent submission id
   * @type {Number}
   */
  id = null

  /**
   * Submit date
   * @type {String}
   */
  submitDate = ''

  /**
   * Submitted by user id
   * @type {String}
   */
  submittedBy = ''

  /**
   * Channel (e.g., 'PROSPERA', 'TERRA', 'SITEPAT')
   * @type {String}
   */
  channel = ''

  /**
   * User channel
   * @type {String}
   */
  userChannel = ''

  /**
   * Customer Information File
   * @type {String}
   */
  cif = ''

  /**
   * Status
   * @type {Number}
   */
  status = null

  /**
   * Agent
   * @type {String}
   */
  agent = ''

  /**
   * User agent
   * @type {String}
   */
  userAgent = ''

  /**
   * Type
   * @type {Number}
   */
  type = null

  /**
   * Version
   * @type {Number}
   */
  version = null

  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

  /**
   * Consent form details
   * @type {ConsentFormResponse}
   */
  consentForm = null

  /**
   * List of consent decisions
   * @type {Array<ConsentDecisionResponse>}
   */
  decisions = []

  /**
   * Approved date
   * @type {String}
   */
  approvedDate = ''

  /**
   * Approved by user id
   * @type {String}
   */
  approvedBy = ''

  /**
   * Last updated date
   * @type {String}
   */
  lastUpdatedDate = ''

  /**
   * Updated by user id
   * @type {String}
   */
  updatedBy = ''
}
