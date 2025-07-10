<template>
  <v-container>
    <BaseBreadCrumb
      :items="[
        { text: 'DASHBOARD', to: '/', active: true },
        { text: 'STATISTIK', active: false },
      ]"
    />
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <BaseCard title="3" subtitle="Clients" color="blue" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <BaseCard title="417" subtitle="Approval" color="amber darken-2" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <BaseCard title="333" subtitle="Acceptance" color="green" />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <BaseCard title="84" subtitle="Rejected" color="red" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <ChartComponent title="Approval Index Per-Client" :chartData="chartData" />
      </v-col>
      <v-col cols="12" md="6">
        <ChartComponent title="Approval Index Per-Clause" :chartData="clauseData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue'
import BaseCard from '@/components/BaseCard.vue'
import BaseBreadCrumb from '@/components/BaseBreadcrumb.vue'
// import Format from '@/plugins/Format'

// const todayText = `Statistik per ${Format.todayWithDay()}`

const chartData = [
  { client: 'PROSPERA', approved: 180, rejected: 50 },
  { client: 'TERRA', approved: 98, rejected: 30 },
  { client: 'T24', approved: 55, rejected: 4 },
]

const clauseData = [
  { client: 'Klausa Umum', approved: 120, rejected: 15 },
  { client: 'Klausa Privasi', approved: 95, rejected: 10 },
  { client: 'Klausa Pembayaran', approved: 110, rejected: 8 },
  { client: 'Klausa Pembatalan', approved: 85, rejected: 20 },
  { client: 'Klausa Pengembalian Dana', approved: 70, rejected: 18 },
  { client: 'Klausa Ketentuan Layanan', approved: 105, rejected: 5 },
  { client: 'Klausa Tambahan', approved: 60, rejected: 12 },
]
</script>
