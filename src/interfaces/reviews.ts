interface Review {
  order_id: string;
  review_date: {
    date: string;
    text: string;
  };
  customer_name: string;
  comment: string;
}

interface ReviewState {
  items: Review[];
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
  error: string | null;
}

interface Column<T> {
  label: string;
  display: (item: T) => React.ReactNode;
  sort?: string;
}