<template>
  <CustomTable
    title="Data.json"
    :data="tableData"
    :paths="[]"
    v-if="tableData.length"
  />

  <div v-else>No data</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import CustomTable from "@/components/CustomTable.vue";
import { useTablesStore } from "@/stores/table-state";

const store = useTablesStore();
const { tableData } = storeToRefs(store);
</script>
