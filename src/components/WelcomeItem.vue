<template>
  <div class="item">
    <i>
      <slot name="icon"></slot>
    </i>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <div class="chart-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
  width: 100%;
}

.chart-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.chart-container > * {
  flex: 1 1 50%;
  min-width: 300px;
}
</style>
