import { defineStore } from "pinia";

import { ref } from "vue";

import { getData } from "@/helpers/api";
import { buildPath } from "@/helpers/build-path";

import type { TableRow, Path } from "@/models/table.model";

export const usePatientsStore = defineStore("patients", () => {
  const patientsData = ref<TableRow[]>([]);
  const isLoading = ref(false);

  async function loadData(): Promise<void> {
    isLoading.value = true;
    const response = await getData();

    patientsData.value.push(...response);
    isLoading.value = false;
  }

  function deleteItem(paths: Path[]): void {
    const { objPath, indexToDelete } = buildPath(paths);

    eval(`patientsData.value${objPath.join("")}.splice(indexToDelete,1)`);
  }

  return { patientsData, isLoading, loadData, deleteItem };
});
