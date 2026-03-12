export interface paymentM {
  id: string;
  paymentId: string;
  merchantName: string;
  date: number; // timestamp
  amount: number;
  status: "completed" | "processing" | "failed";
  customerEmail?: string;
  paymentMethod?: string;
  created_at?: number;
  created_by?: string;
  updated_at?: number;
  updated_by?: string;
}

export interface paymentStats {
  total: number;
  completed: number;
  processing: number;
  failed: number;
  totalRevenue: number;
}