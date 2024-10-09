export type SortConfig = {
  type: 'date' | 'number' | 'string'; 
  property: string; 
  direction: -1 | 1;
} | null | undefined;
export interface TableComponentProps<T> {
  pageSize: number;
  data: T[];
  columns: Column<T>[];
  statuses?: Status[];
  sortConfig?: SortConfig;
}
export interface Column<T> {
  label: string | React.ReactNode; 
  display: (item: T) => React.ReactNode;
  sort?: string;
}

export interface Status {
  label: string;
  value: boolean | string;
}