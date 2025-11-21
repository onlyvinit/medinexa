import React from "react";
import Accordion from "../../ui/Accordion";

const faqData = [
  {
    title: "How long does it take for medication to arrive?",
    content: "Once your prescription is approved, shipping typically takes 2-4 business days. You will receive a tracking number via email as soon as your package ships.",
  },
  {
    title: "What if my medication arrives warm or the ice packs are thawed?",
    content: "Our packaging is designed to keep medications within the safe temperature range during transit. If the medication is not hot to the touch, it is generally safe to use. However, if you have concerns, please contact our support team immediately.",
  },
  {
    title: "What are the most common side effects?",
    content: "Common side effects may include nausea, headache, or fatigue. These usually subside as your body adjusts to the medication. Always consult with your healthcare provider if side effects persist or worsen.",
  },
  {
    title: "Should I count calories?",
    content: "While calorie counting isn't strictly mandatory, being mindful of your intake can support your goals. Our program focuses on sustainable lifestyle changes rather than strict restriction.",
  },
  {
    title: "What should I eat if I'm not hungry?",
    content: "It's important to stay nourished even if your appetite is suppressed. Focus on nutrient-dense foods like lean proteins, vegetables, and healthy fats in smaller portions.",
  },
  {
    title: "Do I have to be on the medication forever?",
    content: "Not necessarily. The duration of treatment varies for each individual based on their health goals and medical history. Your provider will work with you to determine the best long-term plan.",
  },
];

export default function FAQSection() {
  return (
    <section>
      <div className="container">
          <h2 className="text-4xl font-bold text-[#0a0f29] mb-12">FAQ</h2>
          <Accordion items={faqData} />
      </div>
    </section>
  );
}
