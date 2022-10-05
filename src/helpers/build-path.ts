export function buildPath(paths: { tableName: string; rowIndex: number }[]) {
  const objPath: string[] = [];
  let indexToDelete;

  paths.forEach((path, i: number) => {
    if (i === paths.length - 1) {
      indexToDelete = path.rowIndex;
      if (path.tableName === undefined) {
        return;
      }

      objPath.push(`.kids['${path.tableName}'].records`);
    } else {
      if (path.tableName === undefined) {
        objPath.push(`[${path.rowIndex}]`);
        return;
      }

      objPath.push(`.kids['${path.tableName}'].records[${path.rowIndex}]`);
    }
  });

  return { objPath, indexToDelete };
}
