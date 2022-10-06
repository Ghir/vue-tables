import type { Path } from "@/models/table.model";

export function buildPath(paths: Path[]) {
  const objPath: string[] = [];
  let indexToDelete;

  paths.forEach((path: Path, i: number) => {
    if (i === paths.length - 1) {
      indexToDelete = path.rowIndex;
      if (path.tableName === null) {
        return;
      }

      objPath.push(`.kids['${path.tableName}'].records`);
    } else {
      if (path.tableName === null) {
        objPath.push(`[${path.rowIndex}]`);
        return;
      }

      objPath.push(`.kids['${path.tableName}'].records[${path.rowIndex}]`);
    }
  });

  return { objPath: objPath.join(""), indexToDelete };
}
