import { describe, expect, it } from "vitest";

import { buildPath } from "@/helpers/build-path";

describe("build-path.ts", () => {
  it("should return path", () => {
    const paths = [
      { tableName: "data.json", rowIndex: 0 },
      { tableName: "child", rowIndex: 3 },
    ];

    const { objPath, indexToDelete } = buildPath(paths);

    expect(objPath).toBe(".kids['data.json'].records[0].kids['child'].records");
    expect(indexToDelete).toBe(3);
  });
});
