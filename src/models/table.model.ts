export interface TableRow {
  data: Record<string, string>;
  kids: Record<string, { records: TableRow[] }>;
}

export interface Path {
  tableName: string | null;
  rowIndex: number;
}
