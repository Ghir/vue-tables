import type { TableRow } from "@/models/table.model";

import data from "../../example-data.json";

export const getData = (): Promise<TableRow[]> => {
  const patientsData = data as TableRow[];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patientsData);
    }, 500);
  });
};
