// /**
//  * @author: @DyanGalih <dyan.galih@gmail.com>
//  */

// import LoadConfigService from '@/usecases/LoadConfigService'

// let LoadConfig = LoadConfigService.loadConfig()

// const Config = {
//   app: {
//     idle: 180, // 3 minutes in seconds
//     interval: 30000, // 30 seconds in ms
//     maxSessionDuration: 10800000, // 3 hours in ms
//     idleTimeThreshold: 1200000, // 20 minutes in ms
//     money: LoadConfig?.money || 'id-ID',
//     dateLongFormat: 'DD/MM/YYYY',
//     debug: process.env.NODE_ENV !== 'production',
//     locale: [
//       { code: 'id', name: 'Indonesia' },
//       { code: 'en', name: 'English' },
//     ],
//     channelId: 'RVM',
//     individualChannelId: 1,
//     deviceId: '3333111133333',
//     rwKey: LoadConfig?.rwKey,
//     /**
//      * TODO
//      * Enable when firebase ready
//      */
//     // messageTopic: LoadConfig?.messageTopic,
//     // firebaseApiKey: 'AIzaSyDl3mMUdnoXNIuwmOsQydOqKRgZyLHtO5g',
//     // firebaseAuthDomain: 'btpns-dev-prospera-revamp.firebaseapp.com',
//     // firebaseProjectId: 'btpns-dev-prospera-revamp',
//     // firebaseStorageBucket: 'btpns-dev-prospera-revamp.appspot.com',
//     // firebaseMessagingSenderId: '436944935620',
//     // firebaseAppId: '1:436944935620:web:989257a37695f8661f8791',
//     // firebaseMeasurementId: 'G-2NL8F9R4YX',
//     // firebaseVapidKey:
//     //   'BG5wnZOwVL7ZbDgnaQ_dKd_0Anpru3BRWccfmVXA0PCMWyj8_OqcyhKb-NI7YcdR-5J_gqAqDrtFDZz09NtMrEc',
//   },
//   api: {
//     accountingTransaction: '/api/accounting-transaction',
//     additionalData: '/api/additional-data',
//     approvalTransaction: '/api/approval-transaction',
//     bailout: '/api/bailout-btpns',
//     center: '/api/acquisition-center',
//     changeLog: '/api/changelog',
//     closeRebook: '/api/closerebook-management',
//     collection: '/api/collection-sheets-btpns',
//     customer: '/api/acquisition-customer',
//     document: '/api/document',
//     routerWeb: '/api/router-web',
//     glManagement: '/api/gl-management',
//     groupManagement: '/api/acquisition-group',
//     individualTransaction: '/api/individual-transaction',
//     instructionDebet: '/api/instruction-debet-btpns',
//     lineFacility: '/api/line-facility',
//     loanAccount: '/api/loan-account',
//     loanRescheduleManagement: '/api/loan-reschedule-management',
//     loanRescheduleProcessor: '/api/loan-reschedule-processor',
//     managementBatch: '/api/batch-management',
//     masterDataManagement: '/api/master-data-management',
//     officeManagement: '/api/office-management',
//     organization: '/api/organization',
//     organizationPreferences: '/api/organization-preferences',
//     productManagement: '/api/product-management',
//     prosperaWowib: '/api/prospera-wowib',
//     reportAcquisition: '/api/report-acquisition',
//     roleManagement: '/api/role-management',
//     routerMessaging: '/api/router-messaging',
//     routerMonitoring: '/api/router-monitoring',
//     routerProspera: '/api/router-prospera',
//     savingAccount: '/api/saving-account',
//     threeScaleV1: '/api/3scale-v1',
//     threeScale: '/api/3scale',
//     transactionExtractor: '/api/transaction-extractor',
//     uploadSaving: '/api/upload-savings',
//     uploadTransaction: '/api/upload-transaction',
//     userManagement: '/api/user-management',
//     bulkuploadExtractor: '/api/bulkupload-extractor',
//     writeOff: '/api/write-off',
//     writeOffUpload: '/api/write-off-upload',
//     routerWebDukcapil: '/api/router-web-dukcapil',
//     reportTransaction: '/api/report-transaction',
//     openChannel: '/api/open-channel',
//   },
// }
// export default Config
