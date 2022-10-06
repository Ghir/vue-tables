import { useTablesStore } from "../../stores/table-state";
import { mount, VueWrapper } from "@vue/test-utils";

import { QBtn, QTable, Quasar } from "quasar";

import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

// Components
import CustomTable from "@/components/CustomTable.vue";
import CustomRow from "@/components/CustomRow.vue";
import CustomHeader from "@/components/CustomHeader.vue";

describe("CustomTable.vue", () => {
  const propsData = {
    data: [
      {
        data: {
          Name: "Jason",
        },
        kids: {},
      },
    ],
    title: "data.json",
    paths: [{ tableName: null, rowIndex: 0 }],
  };

  it("should display table title", () => {
    const wrapper = mount(CustomTable, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData,
    });

    const table = wrapper.findComponent(QTable);

    expect(table.text()).toContain("data.json");
  });

  it("should display header and cell value", () => {
    const wrapper = mount(CustomTable, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData,
    });

    const header = wrapper.findComponent(CustomHeader);
    const row = wrapper.findComponent(CustomRow);

    expect(header.text()).toContain("Name");
    expect(row.text()).toContain("Jason");
  });

  it("should call delete action on store", () => {
    const wrapper = mount(CustomTable, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData,
    });

    const store = useTablesStore();

    const button = wrapper.findAllComponents(QBtn).at(0) as VueWrapper<QBtn>;
    button.trigger("click");

    expect(store.deleteItem).toHaveBeenCalledTimes(1);
  });

  it("should call pass updated path value to CustomRow component", () => {
    const wrapper = mount(CustomTable, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData,
    });

    const row = wrapper.findComponent(CustomRow);

    expect(row.props().paths).toStrictEqual([
      { tableName: null, rowIndex: 0 },
      { tableName: "data.json", rowIndex: 0 },
    ]);
  });
});
