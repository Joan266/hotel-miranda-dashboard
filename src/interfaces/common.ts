export type SortConfig = {
  type: 'date' | 'number' | 'string'; 
  property: string; 
  direction: -1 | 1;
} | null | undefined;

export type SearchConfig = {
  query: string; 
  param?: string | undefined; 
} | null | undefined;

export interface TableComponentProps<T> {
  pageSize: number;
  data: T[];
  columns: Column<T>[];
  statuses?: Status[];
  sortConfig?: SortConfig;
  searchConfig?: SearchConfig;
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