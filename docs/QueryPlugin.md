# QueryPlugin Documentation

QueryPlugin adalah wrapper untuk TanStack Vue Query yang menyediakan standardisasi error handling, response validation, dan auto-invalidation untuk semua API calls di aplikasi ini.

## 📋 Table of Contents

- [Overview](#overview)
- [Benefits](#benefits)
- [Getting Started](#getting-started)
- [Available Functions](#available-functions)
- [Usage Examples](#usage-examples)
  - [Get List Data](#1-get-list-data)
  - [Get Detail Data](#2-get-detail-data)
  - [Create Data](#3-create-data)
  - [Update Data](#4-update-data)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)
- [Error Handling](#error-handling)

## Overview

QueryPlugin menyediakan 4 fungsi utama:

- `useAppQuery` - Untuk fetching data (GET operations)
- `useAppMutation` - Untuk mutating data (POST, PUT, DELETE operations)
- `createQueryKey` - Helper untuk membuat query key yang konsisten
- `createReactiveMutation` - Helper untuk mutation dengan reactive payload

## Benefits

✅ **Auto Error Handling** - Semua error ditangani secara otomatis  
✅ **Response Validation** - Validasi response.code === 200  
✅ **Auto Retry** - Retry otomatis sampai 3x jika gagal  
✅ **Caching** - Data otomatis di-cache untuk performa yang lebih baik  
✅ **Auto Invalidation** - Related queries otomatis di-refresh setelah mutation  
✅ **Loading States** - Loading states tersedia otomatis  
✅ **Reactive** - Support ref, reactive, dan computed Vue

## Getting Started

### 1. Import QueryPlugin

```javascript
import { useAppQuery, useAppMutation, createQueryKey } from '@/plugins/QueryPlugin'
```

### 2. Define Query Keys

```javascript
const CONSENT_SUBMISSION_QUERY_KEY = 'consent-submissions'
const CONSENT_SUBMISSION_DETAIL_QUERY_KEY = 'consent-submission-detail'
```

### 3. Create Service Functions

```javascript
// Service function yang akan dipanggil oleh hooks
const getConsentSubmissions = async (payload) => {
  const response = await ConsentSubmissionNetworkRepository.getConsentSubmissions(payload)
  // ... transform data ...
  return response
}
```

## Available Functions

### `useAppQuery(queryKey, queryFn, options)`

Untuk fetching data (GET operations).

**Parameters:**

- `queryKey` - Array atau string untuk cache key
- `queryFn` - Function yang akan dipanggil untuk fetch data
- `options` - Options tambahan (payload, enabled, onError, dll)

### `useAppMutation(mutationFn, options)`

Untuk mutating data (POST, PUT, DELETE operations).

**Parameters:**

- `mutationFn` - Function yang akan dipanggil untuk mutation
- `options` - Options tambahan (invalidateQueries, onSuccess, onError, dll)

### `createQueryKey(baseKey, params)`

Helper untuk membuat query key yang konsisten.

**Parameters:**

- `baseKey` - Base key string
- `params` - Parameter tambahan (biasanya ID atau filter)

## Usage Examples

### 1. Get List Data

**📁 Service (ConsentSubmissionService.js)**

```javascript
const useGetConsentSubmissions = (payload, options = {}) => {
  return useAppQuery(createQueryKey(CONSENT_SUBMISSION_QUERY_KEY, payload), getConsentSubmissions, {
    payload,
    initialData: [],
    ...options,
  })
}
```

**📁 View (ConsentRecordList.vue)**

```javascript
import { reactive, computed } from 'vue'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'

// Reactive filters
const appliedFilters = reactive({
  startDate: '',
  endDate: '',
  cif: '',
  status: '',
})

// Use the hook
const { data, isLoading, error } = ConsentSubmissionService.useGetConsentSubmissions(
  appliedFilters,
  {
    enabled: computed(() => true), // Always enabled
  },
)

// Transform data untuk table
const transformedData = computed(() => {
  if (!data.value) return []

  return data.value.map((item) => ({
    id: item.id,
    title: item.consentForm?.title || '',
    status: item.status,
    // ... other fields
  }))
})
```

**🎯 Hasil:**

- `data` - Data list yang sudah di-cache
- `isLoading` - Boolean loading state
- `error` - Error jika ada
- Auto refetch ketika `appliedFilters` berubah

### 2. Get Detail Data

**📁 Service (ConsentSubmissionService.js)**

```javascript
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
```

**📁 View (ConsentRecordDetail.vue)**

```javascript
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'

const route = useRoute()
const recordId = computed(() => route.params.id)

// Use the hook - hanya fetch jika ada ID
const { data: recordData, isLoading } = ConsentSubmissionService.useGetConsentSubmissionDetail(
  recordId,
  {
    enabled: computed(() => !!recordId.value), // Hanya fetch jika ada ID
  },
)
```

**🎯 Hasil:**

- Auto fetch ketika component di-mount
- Auto refetch ketika `recordId` berubah
- Hanya fetch jika `recordId` ada (enabled condition)

### 3. Create Data

**📁 Service (ConsentSubmissionService.js)**

```javascript
const useSubmitConsentSubmission = (options = {}) => {
  return useAppMutation(submitConsentSubmission, {
    invalidateQueries: [[CONSENT_SUBMISSION_QUERY_KEY]], // Auto refresh list
    ...options,
  })
}
```

**📁 View (ConsentRecordCreate.vue)**

```javascript
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'
import { useSnackbarStore } from '@/stores/useSnackbarStore'

const router = useRouter()
const snackbar = useSnackbarStore()

// Reactive form
const form = reactive({
  consentFormId: '',
  channel: '',
  userChannel: '',
  cif: '',
  decisions: [],
})

// Use the hook
const { mutate: submitConsent, isPending: isSubmitting } =
  ConsentSubmissionService.useSubmitConsentSubmission({
    onSuccess: () => {
      snackbar.open('Consent berhasil dibuat')
      router.push('/consent-records')
    },
    onError: (error) => {
      snackbar.open(`Error: ${error.message}`, { color: 'error' })
    },
  })

// Submit function
const submitForm = () => {
  submitConsent(form)
}
```

**🎯 Hasil:**

- `mutate` function untuk trigger create
- `isPending` untuk loading state
- Auto invalidate `CONSENT_SUBMISSION_QUERY_KEY` setelah success
- Auto error handling dengan callback

### 4. Update Data

**📁 Service (ConsentSubmissionService.js)**

```javascript
const useUpdateConsentSubmission = (consentId, options = {}) => {
  return useAppMutation((payload) => updateConsentSubmission(unref(consentId), payload), {
    invalidateQueries: [
      [CONSENT_SUBMISSION_DETAIL_QUERY_KEY, consentId], // Refresh detail
      [CONSENT_SUBMISSION_QUERY_KEY], // Refresh list
    ],
    ...options,
  })
}
```

**📁 View (ConsentRecordEdit.vue)**

```javascript
import { reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConsentSubmissionService from '@/usecases/ConsentSubmissionService'

const route = useRoute()
const router = useRouter()
const recordId = computed(() => route.params.id)

// Reactive form
const form = reactive({
  consentFormId: '',
  channel: '',
  userChannel: '',
  cif: '',
  status: '',
  decisions: [],
})

// Get existing data untuk populate form
const { data: recordData } = ConsentSubmissionService.useGetConsentSubmissionDetail(recordId, {
  enabled: computed(() => !!recordId.value),
})

// Watch data untuk populate form
watch(
  () => recordData.value,
  (record) => {
    if (record) {
      Object.assign(form, {
        consentFormId: record.consentFormId,
        channel: record.channel,
        userChannel: record.userChannel,
        cif: record.cif,
        status: record.status,
        decisions: record.decisions || [],
      })
    }
  },
)

// Use update hook
const { mutate: updateConsent, isPending: isSubmitting } =
  ConsentSubmissionService.useUpdateConsentSubmission(recordId, {
    onSuccess: () => {
      snackbar.open('Consent berhasil diupdate')
      router.push(`/consent-records/detail/${recordId.value}`)
    },
    onError: (error) => {
      snackbar.open(`Error: ${error.message}`, { color: 'error' })
    },
  })

// Submit function
const submitForm = () => {
  updateConsent(form)
}
```

**🎯 Hasil:**

- Auto populate form dari existing data
- Auto invalidate both detail dan list setelah update
- Reactive terhadap perubahan `recordId`

## Advanced Usage

### With Enabled Condition

```javascript
const { data } = ConsentSubmissionService.useGetConsentSubmissions(appliedFilters, {
  enabled: computed(() => statusList.value.length > 0), // Hanya fetch jika ada status list
})
```

### With Data Transformation

```javascript
const transformedData = computed(() => {
  if (!data.value || !statusList.value) return []

  return data.value.map((item) => ({
    id: item.id,
    title: item.consentForm?.title || '',
    status: statusList.value.find((status) => status.id === item.status)?.name || '',
    submitDate: item.submitDate,
  }))
})
```

### With Custom Error Handling

```javascript
const { data, error } = ConsentSubmissionService.useGetConsentSubmissions(appliedFilters, {
  onError: (error) => {
    console.error('Custom error handling:', error)
    snackbar.open(`Failed to load data: ${error.message}`, { color: 'error' })
  },
})
```

## Best Practices

### ✅ DO

```javascript
// 1. Gunakan reactive untuk filters/forms
const filters = reactive({ status: '', date: '' })

// 2. Gunakan computed untuk enabled conditions
const enabled = computed(() => someCondition.value)

// 3. Gunakan computed untuk data transformation
const transformedData = computed(() => data.value?.map(...))

// 4. Tambahkan onSuccess/onError callbacks untuk UX yang baik
const { mutate } = useCreateData({
  onSuccess: () => snackbar.open('Success!'),
  onError: (error) => snackbar.open(`Error: ${error.message}`),
})

// 5. Gunakan invalidateQueries untuk auto refresh related data
const { mutate } = useCreateData({
  invalidateQueries: [
    [LIST_QUERY_KEY],
    [DETAIL_QUERY_KEY, itemId]
  ]
})
```

### ❌ DON'T

```javascript
// 1. Jangan gunakan .value untuk ref saat passing ke hooks
const filters = ref({ status: '' })
useGetData(filters.value) // ❌ Tidak reaktif

// 2. Jangan hardcode enabled condition
useGetData(payload, { enabled: true }) // ❌ Tidak fleksibel

// 3. Jangan lupa handle loading states
// ❌ Tidak ada loading indicator
<BaseTable :items="data" />

// ✅ Dengan loading
<BaseTable :items="data" :loading="isLoading" />
```

## Error Handling

QueryPlugin automatically handles errors, tapi kamu bisa customize:

### Global Error Handling

Error otomatis di-log ke console dan bisa ditangkap dengan `onError` callback.

### Custom Error Messages

```javascript
const { data, error } = useGetData(payload, {
  onError: (error) => {
    if (error.message.includes('404')) {
      snackbar.open('Data tidak ditemukan', { color: 'warning' })
    } else {
      snackbar.open('Terjadi kesalahan server', { color: 'error' })
    }
  },
})
```

### Retry Configuration

```javascript
const { data } = useGetData(payload, {
  retry: 5, // Override default retry (3)
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
})
```

---

## 🎉 Summary

QueryPlugin membuat API calls menjadi:

- **Lebih mudah** - Tidak perlu handle loading/error manually
- **Lebih konsisten** - Standardized error handling di seluruh app
- **Lebih performant** - Auto caching dan invalidation
- **Lebih reactive** - Support Vue reactivity out of the box

Happy coding! 🚀
