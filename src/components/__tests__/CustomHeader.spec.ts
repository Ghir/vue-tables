import { mount } from "@vue/test-utils";

import { Quasar, QTh } from "quasar";

import { describe, expect, it } from "vitest";

import CustomHeader from "@/components/CustomHeader.vue";

describe("CustomHeader.vue", () => {
  it("should display labels", () => {
    const wrapper = mount(CustomHeader, {
      global: {
        plugins: [Quasar],
      },
      propsData: {
        headerProps: {
          cols: [
            { label: "el1", name: "el1" },
            { label: "el2", name: "el2" },
          ],
          colsMap: {
            el1: {
              label: "el1",
            },
            el2: {
              label: "el2",
            },
          },
        },
      },
    });

    const headers = wrapper.findAllComponents(QTh);

    expect(headers.at(1).text()).toContain("el1");
    expect(headers.at(2).text()).toContain("el2");
  });
});
