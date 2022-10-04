<template>
  <CustomTable title="data.json" :data="patientsData" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import CustomTable from "@/components/CustomTable.vue";
import { usePatientsStore } from "@/stores/patients";

const store = usePatientsStore();
const { patientsData } = storeToRefs(store);
</script>
