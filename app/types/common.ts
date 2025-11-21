export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  bestseller: boolean;
  prescriptionRequired: boolean;
  dosage?: string;
  shortDescription: string;
  fullDescription: string;
  recommendedFor: string[];
  contraindications: string[];
  tags?: string[];
  status: "active" | "inactive";
}


export interface RecommendationInput {
   bmi: number;
  bmiLabel: string;
  goal: string;
  conditions: string[];
  medications: string[];
  previousMedExperience: string;
  allergies: string[];
  pancreatitis: string; 
  highBloodPressure: string;
  behavior: string;
  activityLevel: string;
}