<template>
  <div class="q-pa-md" v-if="componentProps.data.length">
    <q-table
      :title="title"
      :rows="rowsWithIds"
      :columns="colunms"
      :row-key="(row) => row.data.rowId"
      :pagination="{ rowsPerPage: 0 }"
      hide-pagination
    >
      <template v-slot:header="props">
        <CustomHeader :headerProps="props"></CustomHeader>
      </template>

      <template v-slot:body="props">
        <CustomRow
          :rowProps="props"
          :paths="addPath(props.rowIndex)"
          @expand="props.expand = !props.expand"
          @delete="deleteItem(addPath(props.rowIndex))"
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
import type { TableRow, Path } from "@/models/table.model";

// Store
import { useTablesStore } from "@/stores/table-state";

const componentProps = defineProps<{
  title: string;
  data: TableRow[];
  paths: Path[];
}>();

const rowsWithIds = computed(() =>
  componentProps.data.map((el: TableRow) => ({
    ...el,
    data: { ...el.data, rowId: Symbol() },
  }))
);

const colunms = computed(() =>
  Object.keys(componentProps.data[0].data).map((key: string) => ({
    name: key,
    label: key,
    field: key,
  }))
);

const { deleteItem } = useTablesStore();

const addPath = (rowIndex: number): Path[] => [
  ...componentProps.paths,
  {
    tableName: componentProps.paths.length > 0 ? componentProps.title : null,
    rowIndex,
  },
];
</script>
