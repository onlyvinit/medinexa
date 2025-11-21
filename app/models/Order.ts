import { ObjectId } from "mongodb";

export interface OrderDocument {
  _id?: ObjectId;
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

  payment?: {
    status: string;
    date: string;
  };

  status: "pending_review" | "approved" | "shipped" | "completed" | "declined";

  createdAt?: string;
}
