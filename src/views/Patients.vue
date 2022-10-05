<template>
  <CustomTable
    title="Data.json"
    :data="patientsData"
    :paths="[]"
    v-if="patientsData.length"
  />

  <div v-else>No data</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import CustomTable from "@/components/CustomTable.vue";
import { usePatientsStore } from "@/stores/patients";

const store = usePatientsStore();
const { patientsData } = storeToRefs(store);
</script>
