// const Customer = () =>
//   import(
//     /* webpackChunkName: "Customer" */ '../views/pages/customers/Customer.vue'
//   )

// // const AdminBulkUpload = () =>
// //   import(
// //     /* webpackChunkName: "AdminBulkUpload" */ '../views/pages/admins/AdminBulkUpload'
// //   )

// const CustomerDataList = () =>
//   import(
//     /* webpackChunkName: "CustomerDataList" */ '../views/pages/customers/searches/CustomerSearchDataList.vue'
//   )

// const CustomerBlacklist = () =>
//   import(
//     /* webpackChunkName: "CustomerBlacklist" */ '../views/pages/customers/CustomerBlacklist'
//   )

// const CustomerCenterCreate = () =>
//   import(
//     /* webpackChunkName: "CustomerCenterCreate" */ '../views/pages/customers/centers/CustomerCenterCreate'
//   )

// const CustomerMeetingForm = () =>
//   import(
//     /* webpackChunkName: "CustomerMeetingForm" */ '../views/pages/customers/centers/CustomerMeetingForm'
//   )

// const CustomerCenter = () =>
//   import(
//     /* webpackChunkName: "CustomerCenter" */ '../views/pages/customers/centers/CustomerCenter'
//   )

// const CustomerGroup = () =>
//   import(
//     /* webpackChunkName: "CustomerGroup" */ '../views/pages/customers/groups/CustomerGroup'
//   )

// const CustomerGroupCreate = () =>
//   import(
//     /* webpackChunkName: "CustomerGroupCreate" */ '../views/pages/customers/groups/CustomerGroupCreate'
//   )

// const CustomerCustomerAccountDetail = () =>
//   import(
//     /* webpackChunkName: "CustomerCustomerAccountDetail" */ '../views/pages/customers/accounts/CustomerCustomerAccountDetail'
//   )

// /**
//  * Loan Modules
//  * Create loan from customer modules
//  * */
// const CustomerLoanCreateStep = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanCreateStep" */ '../views/pages/customers/loans/CustomerLoanCreateStep.vue'
//   )
// const CustomerLoanForm = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanForm" */ '../views/pages/customers/loans/CustomerLoanForm.vue'
//   )
// const CustomerLoanFormReviewSubmit = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanFormReviewSubmit" */ '../views/pages/customers/loans/CustomerLoanFormReviewSubmit.vue'
//   )
// const CustomerLoanDetail = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanDetail" */ '../views/pages/customers/loans/CustomerLoanDetail'
//   )

// const CustomerLoanIndividualDisbursementForm = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanIndividualDisbursementForm" */ '../views/pages/customers/loans/CustomerLoanIndividualDisbursementForm'
//   )

// const CustomerLoanIndividualDisbursementReview = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanIndividualDisbursementReview" */ '../views/pages/customers/loans/CustomerLoanIndividualDisbursementReview'
//   )

// const CustomerSavingCreateStep = () =>
//   import(
//     /* webpackChunkName: "CustomerSavingCreateStep" */ '../views/pages/customers/savings/CustomerSavingCreateStep.vue'
//   )

// const CustomerSavingDetail = () =>
//   import(
//     /* webpackChunkName: "CustomerSavingDetail" */ '../views/pages/customers/savings/CustomerSavingDetail'
//   )

// const CustomerCreateAccountStep = () =>
//   import(
//     /* webpackChunkName: "CustomerCreateAccountStep" */ '../views/pages/customers/accounts/CustomerCustomerAccountCreateStep.vue'
//   )

// const CustomerBailout = () =>
//   import(
//     /* webpackChunkName: "CustomerBailout" */ '../views/pages/customers/CustomerBailout'
//   )

// const CustomerBailoutReview = () =>
//   import(
//     /* webpackChunkName: "CustomerBailoutReview" */ '../views/pages/customers/CustomerBailoutReview'
//   )

// const CustomerBailoutRefund = () =>
//   import(
//     /* webpackChunkName: "CustomerBailoutRefund" */ '../views/pages/customers/CustomerBailoutRefund'
//   )

// const CustomerBailoutRefundReview = () =>
//   import(
//     /* webpackChunkName: "CustomerBailoutRefundReview" */ '../views/pages/customers/CustomerBailoutRefundReview'
//   )

// const CustomerCollectionSheetCreate = () =>
//   import(
//     /* webpackChunkName: "CustomerCollectionSheetCreate" */ '../views/pages/customers/collection_sheets/CustomerCollectionSheetCreate.vue'
//   )
// const CustomerLoanApproveReject = () =>
//   import(
//     /* webpackChunkName: "CustomerLoanApproveReject" */ '../views/pages/customers/loans/CustomerLoanApproveReject'
//   )
// const customer = [
//   {
//     path: 'customer',
//     name: 'Customer',
//     component: Customer,
//     meta: {
//       leftNav: true,
//     },
//   },
//   {
//     path: 'customer/list',
//     name: 'CustomerList',
//     component: CustomerDataList,
//     props: true,
//     meta: {
//       leftNav: true,
//     },
//   },
//   {
//     path: 'customer/center/create',
//     name: 'CustomerCenterCreate',
//     component: CustomerCenterCreate,
//     meta: {
//       leftNav: false,
//     },
//   },
//   {
//     path: 'customer/center/meeting',
//     name: 'CustomerCenterMeetingCreate',
//     component: CustomerMeetingForm,
//     props: true,
//     meta: {
//       leftNav: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber',
//     name: 'CustomerCenter',
//     component: CustomerCenter,
//     props: true,
//     meta: {
//       isPrivate: false,
//       leftNav: true,
//     },
//   },
//   {
//     path: 'customer/create/office/:branchCode?/center/:centerGlobalCustomerNumber?/group/create',
//     name: 'CustomerGroupCreate',
//     component: CustomerGroupCreate,
//     props: true,
//     meta: {
//       leftNav: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber',
//     name: 'CustomerGroup',
//     component: CustomerGroup,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/create/office/:branchCode?/center/:centerGlobalCustomerNumber?/group/:groupGlobalCustomerNumber?/client/create',
//     name: 'CustomerCreateAccountStep',
//     component: CustomerCreateAccountStep,
//     props: true,
//     meta: {
//       leftNav: false,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/detail',
//     name: 'CustomerClientDetail',
//     component: CustomerCustomerAccountDetail,
//     props: true,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/loan/:loanAccountNumber/detail',
//     name: 'CustomerLoanDetail',
//     component: CustomerLoanDetail,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/saving/:savingAccountNumber/detail',
//     name: 'CustomerSavingDetail',
//     component: CustomerSavingDetail,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/edit-status',
//     name: 'CustomerCenterStatusEdit',
//     component: CustomerCenter,
//     meta: {
//       leftNav: true,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/edit-status/review',
//     name: 'CustomerCenterStatusEditReview',
//     component: CustomerCenter,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/edit-status',
//     name: 'CustomerGroupStatusEdit',
//     // component: CustomerStatusEdit,
//     component: CustomerGroup,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/edit-status/review',
//     name: 'CustomerGroupStatusEditReview',
//     // component: CustomerStatusEditReview,
//     component: CustomerGroup,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/edit-status',
//     name: 'CustomerClientStatusEdit',
//     component: CustomerCustomerAccountDetail,
//     // component: CustomerStatusEdit,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/edit-status/review',
//     name: 'CustomerClientStatusEditReview',
//     component: CustomerCustomerAccountDetail,
//     // component: CustomerStatusEditReview,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/saving/:savingAccountNumber/edit-status',
//     name: 'CustomerSavingStatusEdit',
//     // component: CustomerStatusEdit,
//     component: CustomerSavingDetail,
//     props: true,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/saving/:savingAccountNumber/edit-status/review',
//     name: 'CustomerSavingStatusEditReview',
//     // component: CustomerStatusEditReview,
//     component: CustomerSavingDetail,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode?/center/:centerGlobalCustomerNumber?/group/:groupGlobalCustomerNumber?/client/:clientGlobalCustomerNumber?/saving/create',
//     name: 'CustomerSavingCreateStep',
//     component: CustomerSavingCreateStep,
//     props: true,
//     meta: {
//       leftNav: false,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/account/loan',
//     name: 'CustomerLoanApproveReject',
//     component: CustomerLoanApproveReject,
//     meta: {
//       leftNav: true,
//     },
//   },
//   /**
//    * Customer loan route
//    */
//   {
//     path: 'customer/office/:branchCode?/center/:centerGlobalCustomerNumber?/group/:groupGlobalCustomerNumber?/client/:clientGlobalCustomerNumber?/loan/create',
//     name: 'CustomerLoanCreateStep',
//     component: CustomerLoanCreateStep,
//     props: true,
//     meta: {
//       leftNav: false,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber?/loan/:loanAccountNumber/preview',
//     name: 'CustomerLoanEditReview',
//     component: CustomerLoanFormReviewSubmit,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber?/loan/:loanAccountNumber/edit',
//     name: 'CustomerLoanEdit',
//     component: CustomerLoanForm,
//     meta: {
//       leftNav: true,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/loan/:loanAccountNumber/edit-status',
//     name: 'CustomerLoanStatusEdit',
//     // component: CustomerStatusEdit,
//     component: CustomerLoanDetail,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/loan/:loanAccountNumber/edit-status/review',
//     name: 'CustomerLoanStatusEditReview',
//     // component: CustomerStatusEditReview,
//     component: CustomerLoanDetail,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/loan/:loanAccountNumber/individual-disbursement/create',
//     name: 'CustomerLoanIndividualDisbursementForm',
//     /**
//      * TODO - We will refactor customerId params to clientGlobalCustomerNumber
//      */
//     component: CustomerLoanIndividualDisbursementForm,
//     props: true,
//     meta: {
//       leftNav: true,
//       // isCheckEndDay: true,
//     },
//   },
//   {
//     path: 'customer/office/:branchCode/center/:centerGlobalCustomerNumber/group/:groupGlobalCustomerNumber/client/:clientGlobalCustomerNumber/loan/:loanAccountNumber/individual-disbursement/review',
//     name: 'CustomerLoanIndividualDisbursementReview',
//     /**
//      * TODO - We will refactor customerId params to clientGlobalCustomerNumber
//      */
//     component: CustomerLoanIndividualDisbursementReview,
//     props: true,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//       // isCheckEndDay: true,
//     },
//   },
//   {
//     path: '/customer/bailout',
//     name: 'CustomerBailout',
//     component: CustomerBailout,
//     meta: {
//       leftNav: true,
//     },
//   },
//   {
//     path: '/customer/bailout/review',
//     name: 'CustomerBailoutReview',
//     component: CustomerBailoutReview,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: '/customer/bailout-refund',
//     name: 'CustomerBailoutRefund',
//     component: CustomerBailoutRefund,
//     meta: {
//       leftNav: true,
//     },
//   },
//   {
//     path: '/customer/bailout-refund/review',
//     name: 'CustomerBailoutRefundReview',
//     component: CustomerBailoutRefundReview,
//     meta: {
//       leftNav: true,
//       isPrivate: false,
//     },
//   },
//   {
//     path: 'customer/collection-sheet/create',
//     name: 'CustomerCollectionSheetCreate',
//     component: CustomerCollectionSheetCreate,
//     meta: {
//       isDualControl: false,
//       isCheckEndDay: false,
//     },
//   },

//   /**Customer Blacklist */
//   {
//     path: '/customer/blacklist',
//     name: 'CustomerBlacklist',
//     component: CustomerBlacklist,
//     meta: {
//       leftNav: false,
//     },
//   },
//   {
//     path: '/no-route/blacklist-customer-for-create-or-edit',
//     name: 'BlacklistCustomerForCreateOrEdit',
//     meta: {
//       leftNav: false,
//       isNoRoute: true,
//     },
//   },
//   // {
//   //   path: '/customer/bulk-upload-blacklist-customer',
//   //   name: 'CustomerBulkUploadBlacklistCustomer',
//   //   component: AdminBulkUpload,
//   //   props: true,
//   //   meta: {
//   //     leftNav: false,
//   //   },
//   // },
//   {
//     path: '/no-route/bulk-upload-blacklist-customer-for-upload',
//     name: 'CustomerBulkUploadBlacklistCustomerForUpload',
//     meta: {
//       leftNav: false,
//       isNoRoute: true,
//     },
//   },
//   {
//     path: '/no-route/bulk-upload-blacklist-customer-for-download',
//     name: 'CustomerBulkUploadBlacklistCustomerForDownload',
//     meta: {
//       leftNav: false,
//       isNoRoute: true,
//     },
//   },
//   {
//     path: '/no-routebulk-upload-blacklist-customer-for-approval',
//     name: 'CustomerBulkUploadBlacklistCustomerForApproval',
//     meta: {
//       leftNav: false,
//       isNoRoute: true,
//     },
//   },
//   /**
//    * no-route
//    */
//   {
//     path: '/no-route/customer-create-account-submit-for-continue',
//     name: 'CustomerCreateAccountStepSubmitForContinue',
//     props: true,
//     meta: {
//       leftNav: false,
//       isNoRoute: true,
//     },
//   },
//   {
//     path: '/no-route/customer-create-account-submit-for-approval',
//     name: 'CustomerCreateAccountStepSubmitForApproval',
//     props: true,
//     meta: {
//       leftNav: false,
//       isNoRoute: true,
//     },
//   },
// ]

// export default customer
