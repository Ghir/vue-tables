<template>
  <div v-if="isLoading">Loading...</div>

  <div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useTablesStore } from "@/stores/table-state";

const store = useTablesStore();
const { isLoading } = storeToRefs(store);
</script>
