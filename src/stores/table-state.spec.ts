import { setActivePinia, createPinia } from "pinia";

import { describe, expect, it, beforeEach, vi } from "vitest";

import { useTablesStore } from "@/stores/table-state";

describe("Tables Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vi.mock("@/helpers/api.mock", () => {
      return {
        getData: () =>
          Promise.resolve([
            {
              data: {
                name: "Jason",
              },
            },
            {
              data: {
                name: "Joqmo",
              },
            },
          ]),
      };
    });
  });

  it("should load and delete", async () => {
    const { tableData, deleteItem, loadData } = useTablesStore();

    expect(tableData.length).toBe(0);

    await loadData();

    expect(tableData.length).toBe(2);

    deleteItem([{ tableName: null, rowIndex: 0 }]);

    expect(tableData.length).toBe(1);
    expect(tableData[0].data.name).toBe("Joqmo");
  });
});
