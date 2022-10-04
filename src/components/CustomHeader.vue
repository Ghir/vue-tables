<template>
  <q-tr :props="headerProps">
    <q-th auto-width />
    <q-th v-for="col in headerProps.cols" :key="col.name" :props="headerProps">
      {{ col.label }}
    </q-th>
  </q-tr>
</template>

<script setup lang="ts">
defineProps(["headerProps"]);
</script>
