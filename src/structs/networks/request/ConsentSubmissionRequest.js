export class ConsentDecisionRequest {
  /**
   * Consent section id
   * @type {Number}
   */
  consentSectionId = null

  /**
   * Whether the consent is accepted
   * @type {Boolean}
   */
  accepted = null
}

export class GetConsentSubmissionRequest {
  /**
   * Customer Information File
   * @type {String}
   */
  cif = ''

  /**
   * Start date for filtering (YYYY-MM-DD format)
   * @type {String}
   */
  startDate = ''

  /**
   * End date for filtering (YYYY-MM-DD format)
   * @type {String}
   */
  endDate = ''

  /**
   * Status filter
   * @type {Number}
   */
  status = null
}

export class SubmitConsentSubmissionRequest {
  /**
   * Consent form id
   * @type {Number}
   */
  consentFormId = null

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
   * List of consent decisions
   * @type {Array<ConsentDecisionRequest>}
   */
  decisions = []
}

export class UpdateConsentSubmissionRequest {
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
   * List of consent decisions
   * @type {Array<ConsentDecisionRequest>}
   */
  decisions = []

  /**
   * Status
   * @type {Integer}
   */
  status = 0
}
