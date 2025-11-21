export interface Medication {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  sideEffects: string[];
  dosage: string;
  price: number;
  image: string;
  faqs: { question: string; answer: string }[];
}

export const medications: Medication[] = [
  {
    id: "1",
    slug: "semaglutide",
    name: "Semaglutide",
    shortDescription: "A GLP-1 medication for effective weight management.",
    fullDescription:
      "Semaglutide is a revolutionary GLP-1 receptor agonist that mimics a hormone that targets areas of the brain involved in appetite regulation. It helps you feel fuller for longer, reducing your overall calorie intake and promoting significant weight loss.",
    benefits: [
      "Reduces appetite and cravings",
      "Promotes significant weight loss",
      "Improves blood sugar control",
      "Convenient weekly injection",
    ],
    sideEffects: [
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Stomach pain",
      "Constipation",
    ],
    dosage: "Once weekly injection",
    price: 299,
    image: "/medications/Semaglutide.png",
    faqs: [
      {
        question: "How does Semaglutide work?",
        answer:
          "It mimics the GLP-1 hormone, which regulates appetite and food intake.",
      },
      {
        question: "How much weight can I lose?",
        answer:
          "Clinical trials have shown weight loss of up to 15% of body weight.",
      },
    ],
  },
  {
    id: "2",
    slug: "tirzepatide",
    name: "Tirzepatide",
    shortDescription: "Dual GIP/GLP-1 receptor agonist for advanced weight loss.",
    fullDescription:
      "Tirzepatide is the first and only dual GIP and GLP-1 receptor agonist. It works on two different hormone receptors to control blood sugar and appetite, leading to even greater weight loss results compared to single-hormone treatments.",
    benefits: [
      "Dual action for maximum efficacy",
      "Superior weight loss results",
      "Improves metabolic health",
      "Weekly administration",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Decreased appetite",
      "Vomiting",
      "Indigestion",
    ],
    dosage: "Once weekly injection",
    price: 399,
    image: "/medications/tirzepatide.png",
    faqs: [
      {
        question: "What is the difference between Tirzepatide and Semaglutide?",
        answer:
          "Tirzepatide targets two receptors (GIP and GLP-1), while Semaglutide targets only one (GLP-1).",
      },
      {
        question: "Is it safe?",
        answer:
          "It is FDA approved and has been tested in extensive clinical trials.",
      },
    ],
  },
  {
    id: "3",
    slug: "orlistat",
    name: "Orlistat",
    shortDescription: "A lipase inhibitor that blocks fat absorption.",
    fullDescription:
      "Orlistat works by blocking the enzyme lipase, which breaks down dietary fat. This prevents about 25% of the fat you eat from being absorbed by your body, helping you lose weight when combined with a reduced-calorie diet.",
    benefits: [
      "Blocks fat absorption",
      "Non-systemic action",
      "Daily oral capsule",
      "Proven long-term safety",
    ],
    sideEffects: [
      "Oily spotting",
      "Flatus with discharge",
      "Fecal urgency",
      "Fatty/oily stool",
    ],
    dosage: "Three times daily with meals",
    price: 149,
    image: "/medications/orlistat.png",
    faqs: [
      {
        question: "Do I need to follow a diet?",
        answer:
          "Yes, a low-fat diet is recommended to minimize side effects and maximize results.",
      },
      {
        question: "When should I take it?",
        answer:
          "Take one capsule with each meal containing fat (up to three times a day).",
      },
    ],
  },
];
