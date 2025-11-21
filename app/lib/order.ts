// app/types/order.ts

export interface Order {
  id: string;                         // e.g., "ORD-90321"
  userId: string;                     // User identifier from login
  userEmail: string;                  // For admin reference
  userName: string;                   // Optional convenience

  product: {
    id: string;                       // product ID e.g. "semaglutide"
    name: string;                     // product name
    price: number;                    // product price
    slug: string;                     // product slug
    reason: string;                   // why this product was recommended
  };

  patientInfo: any;         
  intakeAnswers: Record<string, any>; 

  payment: {
    status: "success" | "failed" | "pending";
    date: string;                     // payment timestamp
  };

  status:                               
    | "pending_review"
    | "approved"
    | "shipped"
    | "completed"
    | "declined";                    // admin-updatable status

  createdAt: string;                  // order creation timestamp
}
