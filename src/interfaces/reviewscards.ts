export interface Review {
  id: number;
  customer_name: string;
  review_date: { text: string };
  comment: string;
  img: string | null;
}

export interface ReviewCardsProps {
  data: Review[];
}