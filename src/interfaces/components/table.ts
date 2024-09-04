interface Column<T> {
  label: string;
  display: (item: T) => React.ReactNode;
  sort?: string;
}

interface Status {
  label: string;
  value: string | boolean;
}

interface TableComponentProps<T> {
  pageSize: number;
  data: T[];
  columns: Column<T>[];
  statuses?: Status[];
  sorterProperty?: string;
}