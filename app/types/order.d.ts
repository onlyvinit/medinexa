export interface Order {
  id: string;
  userId: string;
  userEmail: string;

  patientInfo: any;
  intakeAnswers: any;

  product?: {
    id: string;
    name: string;
    price: number;
    slug: string;
    reason: string;
  };

  recommendedProduct?: any;

  payment?: {
    status: string;
    date: string;
  };

  status: "pending_review" | "approved" | "shipped" | "completed" | "declined";

  amount?: number;
  date?: string;
  createdAt?: string;
}
