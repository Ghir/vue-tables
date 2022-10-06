import type { TableRow } from "@/models/table.model";

import exampleData from "../../example-data.json";

export const getData = (): Promise<TableRow[]> => {
  const data = exampleData as TableRow[];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
