import { defineStore } from "pinia";

import { reactive, ref } from "vue";

import { getData } from "@/helpers/api";
import type { TableRow } from "@/models/table.model";

export const usePatientsStore = defineStore("patients", () => {
  let patientsData: TableRow[] = reactive([]);
  let isLoading = ref(false);

  async function loadData(): Promise<void> {
    isLoading.value = true;
    const response = await getData();

    patientsData.push(...response);
    isLoading.value = false;
  }

  return { patientsData, isLoading, loadData };
});
