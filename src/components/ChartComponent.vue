<template>
  <div class="chart-card">
    <h2 class="title">{{ title }}</h2>
    <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})

const categories = computed(() => props.chartData.map((item) => item.client))
const series = computed(() => [
  {
    name: 'Approved',
    data: props.chartData.map((item) => item.approved),
  },
  {
    name: 'Rejected',
    data: props.chartData.map((item) => item.rejected),
  },
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    stacked: true,
    toolbar: {
      show: true,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 8, // rounded bar
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '13px',
      colors: ['#000'],
    },
  },
  xaxis: {
    categories: categories.value,
  },
  colors: ['#00C49F', '#FF4B4B'],
  legend: {
    position: 'top',
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}))
</script>

<style scoped>
.chart-card {
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  margin: 2rem auto;
  max-width: 700px;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #333;
}
</style>
