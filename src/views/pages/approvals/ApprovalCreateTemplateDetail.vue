<template>
  <div>
    <app-label label="Judul Template" :value="requestApproval.title" />
    <app-label label="Deskripsi Template" :value="requestApproval.description" />
    <app-label label="Version" :value="requestApproval.version" />
    <template-record-table :template="requestApproval" clauses-key="clauses" show-template-meta />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import AppLabel from '@/components/AppLabel.vue'
import TemplateRecordTable from '@/components/TemplateRecordTable.vue'

const props = defineProps({
  approvalData: {
    type: Object,
    required: true,
  },
})

const requestApproval = computed(() => JSON.parse(props.approvalData.requestApproval))
</script>
