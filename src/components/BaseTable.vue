<template>
  <v-card>
    <v-table>
      <thead>
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="text-white font-weight-bold"
            style="background-color: #004d4d"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) in items" :key="rowIndex">
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            {{ item[header.value] }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
    // contoh: [{ text: 'Nama File', value: 'namaFile' }, ...]
  },
  items: {
    type: Array,
    required: true,
    // contoh: [{ namaFile: 'xxx', dibuatOleh: 'yyy', ... }, ...]
  },
})
</script>
