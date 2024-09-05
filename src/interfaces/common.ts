export interface TableComponentProps<T> {
  pageSize: number;
  data: T[];
  columns: Column<T>[];
  statuses?: Status[];
  sorterProperty?: string;
}
export interface Column<T> {
  label: string;
  display: (item: T) => React.ReactNode;
  sort?: string;
}

export interface Status {
  label: string;
  value: boolean | string;
}