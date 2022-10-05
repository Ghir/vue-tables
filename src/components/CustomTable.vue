<template>
  <div class="q-pa-md" v-if="componentProps.data.length">
    <q-table
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
          :paths="[
            ...componentProps.paths,
            { tableName: componentProps.title, rowIndex: props.rowIndex },
          ]"
          @expand="props.expand = !props.expand"
          @delete="deleteRow(props.rowIndex)"
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

// Store
import { usePatientsStore } from "@/stores/patients";

const componentProps = defineProps<{
  title: string;
  data: TableRow[];
  paths: { tableName: string; rowIndex: number }[];
}>();

const colunms = computed(() =>
  Object.keys(componentProps.data[0].data).map((key: string) => ({
    name: key,
    label: key,
    field: key,
  }))
);

const { deleteItem } = usePatientsStore();

const deleteRow = (rowIndex: number): void => {
  deleteItem([
    ...componentProps.paths,
    { tableName: componentProps.title, rowIndex },
  ]);
};
</script>
