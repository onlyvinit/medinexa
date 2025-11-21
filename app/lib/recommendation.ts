import { Product, RecommendationInput } from "../types/common";

function generateUserTags(input: RecommendationInput): string[] {
  const tags: string[] = [];

  if (input.bmi >= 35) tags.push("bmi_35_plus");
  if (input.bmi >= 30) tags.push("bmi_30_plus");
  if (input.bmi >= 27) tags.push("bmi_27_plus");
  if (input.bmi >= 25) tags.push("bmi_25_plus");

  if (input.goal === "35_plus") tags.push("extreme_weight_loss_goal");
  if (input.goal === "20_35") tags.push("moderate_goal");
  if (input.goal === "less_10") tags.push("mild_goal");

  if (input.behavior) tags.push(input.behavior);

  tags.push(...input.conditions);

  input.allergies.forEach((a) => tags.push(`allergy_${a}`));

  return tags;
}

export function recommendProduct(
  products: Product[],
  input: RecommendationInput
): { product: Product | null; reason: string } {
  const userTags = generateUserTags(input);

  let bestProduct: Product | null = null;
  let bestScore = -Infinity;
  let reason = "";

  for (const product of products) {
    let score = 0;

    for (const c of product.contraindications) {
      if (
        (c === "pancreatitis" && input.pancreatitis === "yes") ||
        (c === "high_bp" && input.highBloodPressure === "yes") ||
        (c.includes("allergy") &&
          input.allergies.includes(c.replace("_allergy", ""))) ||
        input.conditions.includes(c)
      ) {
        score = -9999;
      }
    }

    if (score === -9999) continue;

    product.recommendedFor.forEach((tag) => {
      if (userTags.includes(tag)) score += 30;
    });

    if (input.bmi >= 35 && product.id === "tirzepatide") score += 40;
    if (input.bmi >= 30 && product.id === "semaglutide") score += 35;
    if (input.bmi >= 27 && product.id === "liraglutide") score += 20;
    if (input.bmi >= 25 && product.id === "orlistat") score += 15;

    if (input.behavior === "emotional_eating" && product.id === "semaglutide")
      score += 25;
    if (input.behavior === "overeating" && product.id === "phentermine")
      score += 25;

    if (input.goal === "35_plus" && product.id === "tirzepatide") score += 30;
    if (input.goal === "20_35" && product.id === "semaglutide") score += 20;
    if (input.goal === "less_10" && product.id === "orlistat") score += 10;

    if (input.conditions.includes("diabetes") && product.id === "tirzepatide")
      score += 20;

    if (input.conditions.includes("diabetes") && product.id === "semaglutide")
      score += 20;

    if (input.conditions.includes("pcos") && product.id === "semaglutide")
      score += 10;

    if (product.bestseller) score += 5;

    if (score > bestScore) {
      bestScore = score;
      bestProduct = product;
    }
  }

  if (!bestProduct) {
    return {
      product: null,
      reason:
        "We could not find a medically safe medication based on your answers.",
    };
  }

  reason = `Recommended based on BMI (${input.bmiLabel}), weight-loss goals, medical history, and safety profile.`;

  return { product: bestProduct, reason };
}
