import { defineStore } from "pinia";

import { ref } from "vue";

import _ from "lodash";

import { getData } from "@/helpers/api.mock";
import { buildPath } from "@/helpers/build-path";

import type { TableRow, Path } from "@/models/table.model";

export const useTablesStore = defineStore("tables", () => {
  const tableData = ref<TableRow[]>([]);
  const isLoading = ref(false);

  async function loadData(): Promise<void> {
    isLoading.value = true;
    const response = await getData();

    tableData.value.push(...response);
    isLoading.value = false;
  }

  function deleteItem(paths: Path[]): void {
    const { objPath, indexToDelete } = buildPath(paths);

    const targetArray = _.get(tableData.value, objPath, tableData.value);
    targetArray.splice(indexToDelete, 1);
    _.set(tableData.value, objPath, targetArray);
  }

  return { tableData, isLoading, loadData, deleteItem };
});
