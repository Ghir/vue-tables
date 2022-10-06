import { mount, VueWrapper } from "@vue/test-utils";

import { QBtn, QTd, Quasar } from "quasar";

import { describe, expect, it, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";

// Components
import CustomRow from "@/components/CustomRow.vue";
import CustomTable from "@/components/CustomTable.vue";

describe("CustomRow.vue", () => {
  const rowProps = {
    cols: [
      {
        label: "header1",
        name: "header1",
        __tdClass: () => {},
        __tdStyle: () => {},
      },
    ],
    colsMap: {
      header1: {
        label: "header1",
        name: "header1",
        __tdClass: () => {},
        __tdStyle: () => {},
      },
    },
    row: {
      data: {
        header1: "value1",
      },
      kids: {
        firstChild: {
          records: [
            {
              data: {
                header1: "value1",
              },
              kids: {},
            },
          ],
        },
        secondChild: {
          records: [
            {
              data: {
                header1: "value1",
              },
              kids: {},
            },
          ],
        },
      },
    },
  };

  it("should display cell value", () => {
    const wrapper = mount(CustomRow, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData: {
        rowProps,
        paths: [],
      },
    });

    const cells = wrapper.findAllComponents(QTd);

    expect(cells.at(1).text()).toContain("value1");
  });

  it("should display child table", () => {
    const wrapper = mount(CustomRow, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData: {
        rowProps,
        paths: [],
      },
    });

    const tables = wrapper.findAllComponents(CustomTable);

    expect(tables.length).toBe(2);
  });

  it("should emit expand event", async () => {
    const wrapper = mount(CustomRow, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData: {
        rowProps,
        paths: [],
      },
    });

    const button = wrapper.findComponent(QBtn);
    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().expand).toBeTruthy();
  });

  it("should emit delete event", async () => {
    const wrapper = mount(CustomRow, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
      propsData: {
        rowProps,
        paths: [],
      },
    });

    const button = wrapper.findAllComponents(QBtn).at(1) as VueWrapper<QBtn>;
    button.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().delete).toBeTruthy();
  });
});
