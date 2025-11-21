import { Product } from "../types/common";

export const products: Product[] = [
  {
    id: "semaglutide",
    name: "Semaglutide",
    slug: "semaglutide",
    image: "/images/Semaglutide.webp",
    price: 249,
    bestseller: true,
    prescriptionRequired: true,
    dosage: "0.25mg → 2.4mg weekly",
    shortDescription: "Clinically proven GLP-1 medication for sustainable weight loss.",
    fullDescription:
      "Semaglutide helps control appetite, reduces cravings, and supports long-term fat reduction. FDA-approved for weight loss under brand Wegovy.",
    recommendedFor: ["bmi_30_plus", "bmi_27_plus", "diabetes", "pcos", "emotional_eating"],
    contraindications: ["pancreatitis", "glp1_allergy"],
    status: "active"
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    slug: "tirzepatide",
    image: "/images/Tirzepatide.webp",
    price: 299,
    bestseller: true,
    prescriptionRequired: true,
    dosage: "2.5mg → 15mg weekly",
    shortDescription: "Dual GLP-1 + GIP medication offering the strongest weight-loss results.",
    fullDescription:
      "Tirzepatide (Zepbound/Mounjaro) is one of the most effective modern weight management medications, ideal for high BMI or metabolic conditions.",
    recommendedFor: ["bmi_35_plus", "diabetes", "extreme_weight_loss_goal"],
    contraindications: ["pancreatitis", "glp1_allergy"],
    status: "active"
  },
  {
    id: "liraglutide",
    name: "Liraglutide",
    slug: "liraglutide",
    image: "/images/liraglutide.webp",
    price: 199,
    bestseller: false,
    prescriptionRequired: true,
    dosage: "0.6mg → 3.0mg daily injection",
    shortDescription: "Daily GLP-1 injection supporting appetite control.",
    fullDescription:
      "Liraglutide (Saxenda) is a daily GLP-1 medication effective for moderate weight loss and appetite suppression.",
    recommendedFor: ["bmi_27_plus", "moderate_goal"],
    contraindications: ["pancreatitis"],
    status: "active"
  },
  {
    id: "phentermine",
    name: "Phentermine",
    slug: "phentermine",
    image: "/images/phentermine.jpeg",
    price: 79,
    bestseller: false,
    prescriptionRequired: true,
    dosage: "15mg – 37.5mg daily",
    shortDescription: "Appetite suppressant for short-term weight loss.",
    fullDescription:
      "Phentermine is a stimulant medication used for short-term rapid weight reduction by suppressing appetite.",
    recommendedFor: ["quick_results", "overeating"],
    contraindications: ["heart_disease", "high_bp", "stimulant_allergy"],
    status: "active"
  },
  {
    id: "orlistat",
    name: "Orlistat",
    slug: "orlistat",
    image: "/images/orlistat.jpeg",
    price: 49,
    bestseller: false,
    prescriptionRequired: false,
    dosage: "120mg per meal",
    shortDescription: "Blocks fat absorption during meals.",
    fullDescription:
      "Orlistat reduces dietary fat absorption, making it suitable for individuals who cannot take GLP-1 medications.",
    recommendedFor: ["bmi_25_plus", "mild_goal"],
    contraindications: ["orlistat_allergy"],
    status: "active"
  },
  {
    id: "qsymia",
    name: "Qsymia",
    slug: "qsymia",
    image: "/images/qsymia.webp",
    price: 129,
    bestseller: false,
    prescriptionRequired: true,
    dosage: "3.75mg/23mg → 15mg/92mg daily",
    shortDescription: "Combination therapy for appetite control and metabolic improvement.",
    fullDescription:
      "Qsymia combines Phentermine + Topiramate for enhanced appetite suppression and metabolic support.",
    recommendedFor: ["overeating", "slow_metabolism"],
    contraindications: ["depression", "anti_epileptic_meds", "pregnancy"],
    status: "active"
  }
];
