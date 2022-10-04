<template>
  <div class="q-pa-md">
    <q-table
      hide-pagination
      :title="title"
      :rows="data"
      :columns="colunms"
      :row-key="(row) => row.data[Object.keys(row.data)[0]]"
    >
      <template v-slot:header="props">
        <CustomHeader :headerProps="props"></CustomHeader>
      </template>

      <template v-slot:body="props">
        <CustomRow
          :rowProps="props"
          @expand="props.expand = !props.expand"
        ></CustomRow>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

// Components
import CustomRow from "@/components/CustomRow.vue";
import CustomHeader from "@/components/CustomHeader.vue";

// Models
import type { TableRow } from "@/models/table.model";

const componentProps = defineProps<{
  title: string;
  data: TableRow[];
}>();

const colunms = computed(() =>
  Object.keys(componentProps.data[0].data).map((key: string) => ({
    name: key,
    label: key,
    field: key,
  }))
);
</script>
