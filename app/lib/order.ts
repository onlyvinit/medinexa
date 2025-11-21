export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;

  product: {
    id: string;
    name: string;
    price: number;
    slug: string;
    reason: string;
  };

  patientInfo: any;
  intakeAnswers: Record<string, any>;

  payment: {
    status: "success" | "failed" | "pending";
    date: string;
  };

  status: "pending_review" | "approved" | "shipped" | "completed" | "declined";

  createdAt: string;
}
