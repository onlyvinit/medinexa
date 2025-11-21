"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useIntakeFlow from "@/app/hooks/useIntakeFlow";

import { products } from "@/app/database/product";
import { recommendProduct } from "@/app/lib/recommendation";

import intakeConfigJson from "@/app/database/intakeQuestions.json";

import Card from "@/app/components/ui/Card";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import SelectInput from "@/app/components/ui/SelectInput";
import MultiSelectInput from "@/app/components/ui/MultiSelectInput";
import RadioGroupInput from "@/app/components/ui/RadioGroupInput";
import FileUpload from "@/app/components/ui/FileUpload";
import TextAreaInput from "@/app/components/ui/TextAreaInput";
import BMIForm from "../components/forms/BMIForm";
import PatientInfoForm from "../components/forms/PatientInfoForm";

type QuestionType =
  | "number"
  | "single-select"
  | "multi-select"
  | "boolean"
  | "file-upload"
  | "text-long";

interface QuestionOption {
  label: string;
  value: string;
}

interface Question {
  id: string;
  question: string;
  type: QuestionType;
  required?: boolean;
  options?: QuestionOption[];
  logicTags?: string[];
}

interface StepConfig {
  id: string;
  title: string;
  questions: Question[];
}

interface IntakeConfig {
  steps: StepConfig[];
}

const intakeConfig = intakeConfigJson as IntakeConfig;

export default function IntakeFlow() {
  const router = useRouter();

  const {
    currentStepIndex,
    patientInfo,
    intakeAnswers,
    savePatientInfo,
    saveBodyMetrics,
    saveGenericStepAnswers,
    goToPreviousStep,
  } = useIntakeFlow();

  const totalSteps = 1 + intakeConfig.steps.length;
  const progressPercent = Math.min((currentStepIndex / totalSteps) * 100, 100);
  const currentUiStep = Math.min(currentStepIndex + 1, totalSteps);

  const handleGenericStepSubmit = (
    stepId: string,
    stepAnswers: Record<string, any>
  ) => {
    const combined = { ...intakeAnswers, ...stepAnswers };
    const nextIndex = currentStepIndex + 1;

    saveGenericStepAnswers(stepAnswers);

    if (typeof window !== "undefined") {
      localStorage.setItem("intakeAnswers", JSON.stringify(combined));
    }

    if (nextIndex > intakeConfig.steps.length) {
      const finalData = { patientInfo, intakeAnswers: combined };

      localStorage.setItem("intakeFlowState_v1", JSON.stringify(finalData));

      const { product, reason } = recommendProduct(products, combined as any);

      if (!product) return router.push("/no-eligible-medication");

      localStorage.setItem(
        "recommendation",
        JSON.stringify({
          productId: product.id,
          slug: product.slug,
          reason,
        })
      );

      return router.push(
        `/checkout/${product.slug}?reason=${encodeURIComponent(reason)}`
      );
    }
  };

  const renderQuestionField = (
    q: Question,
    value: any,
    onChange: (val: any) => void
  ) => {
    switch (q.type) {
      case "number":
        return (
          <NumberField
            question={q}
            value={value}
            onChange={(v) => onChange(v)}
          />
        );

      case "single-select":
        return (
          <SelectInput
            label={q.question}
            name={q.id}
            value={value || ""}
            required={q.required}
            options={(q.options || []).map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "multi-select":
        return (
          <MultiSelectInput
            label={q.question}
            name={q.id}
            values={value || []}
            required={q.required}
            options={(q.options || []).map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))}
            onChange={(vals) => onChange(vals)}
          />
        );

      case "boolean":
        return (
          <RadioGroupInput
            label={q.question}
            name={q.id}
            value={value || ""}
            required={q.required}
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={onChange}
          />
        );

      case "file-upload":
        return (
          <FileUpload
            label={q.question}
            name={q.id}
            file={value}
            onChange={(file) => onChange(file)}
          />
        );

      case "text-long":
        return (
          <TextAreaInput
            label={q.question}
            name={q.id}
            value={value || ""}
            required={q.required}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  const GenericStep = ({ step }: { step: StepConfig }) => {
    const [localAnswers, setLocalAnswers] = useState<Record<string, any>>(
      Object.fromEntries(
        step.questions.map((q) => [
          q.id,
          intakeAnswers[q.id] ?? getDefaultValue(q),
        ])
      )
    );

    const [error, setError] = useState<string | null>(null);

    const handleChange = (id: string, value: any) => {
      if (error) setError(null);
      setLocalAnswers((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
      const validationError = validateStep(step, localAnswers);
      if (validationError) {
        setError(validationError);
        return;
      }
      handleGenericStepSubmit(step.id, localAnswers);
    };

    const isStepValid = step.questions.every((q) => {
      if (!q.required) return true;
      const value = localAnswers[q.id];

      if (q.type === "multi-select") {
        return Array.isArray(value) && value.length > 0;
      }
      if (q.type === "file-upload") {
        return value !== null && value !== undefined;
      }
      return value !== "" && value !== undefined && value !== null;
    });

    return (
      <div className="w-full max-w-3xl mx-auto">
        <ProgressBar
          currentStep={currentUiStep}
          totalSteps={totalSteps}
          percent={progressPercent}
        />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {step.title}
        </h2>
        <p className="text-gray-600 mb-6">
          Please answer the following questions to help us tailor your
          treatment.
        </p>

        <Card>
          <div className="flex flex-col gap-4">
            {step.questions.map((q) => (
              <div key={q.id}>
                {renderQuestionField(q, localAnswers[q.id], (v) =>
                  handleChange(q.id, v)
                )}
              </div>
            ))}
          </div>

          {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

          <div className="mt-6 flex justify-between gap-3">
            <ButtonPrimary label="Back" onClick={goToPreviousStep} />
            <ButtonPrimary
              label={
                step.id === intakeConfig.steps[intakeConfig.steps.length - 1].id
                  ? "Finish"
                  : "Continue"
              }
              onClick={handleSubmit}
              disabled={!isStepValid}
            />
          </div>
        </Card>
      </div>
    );
  };

  const jsonStepIndex = currentStepIndex - 1;
  const step = intakeConfig.steps[jsonStepIndex];

  if (currentStepIndex === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <ProgressBar
          currentStep={currentUiStep}
          totalSteps={totalSteps}
          percent={progressPercent}
        />
        <PatientInfoForm onNext={savePatientInfo} />
      </div>
    );
  }

  if (step?.id === "bodyMetrics") {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <ProgressBar
          currentStep={currentUiStep}
          totalSteps={totalSteps}
          percent={progressPercent}
        />
        <BMIForm onNext={saveBodyMetrics} onBack={goToPreviousStep} />

        <p className="text-sm text-gray-500 mt-2">
          BMI is calculated based on your height and weight.
        </p>
      </div>
    );
  }

  if (!step) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <p className="text-gray-700">Intake completed.</p>
      </div>
    );
  }

  return <GenericStep step={step} />;
}

function getDefaultValue(q: Question): any {
  switch (q.type) {
    case "multi-select":
      return [];
    case "file-upload":
      return null;
    default:
      return "";
  }
}

function validateStep(
  step: StepConfig,
  answers: Record<string, any>
): string | null {
  for (const q of step.questions) {
    if (!q.required) continue;
    const value = answers[q.id];

    switch (q.type) {
      case "number":
        const num = parseFloat(value);
        if (!value || isNaN(num)) {
          return `Please enter a valid number for "${q.question}"`;
        }
        break;

      case "multi-select":
        if (!Array.isArray(value) || value.length === 0) {
          return `Please select at least one option for "${q.question}"`;
        }
        break;

      case "file-upload":
        if (!value) {
          return `Please upload the required file for "${q.question}"`;
        }
        break;

      case "text-long":
        if (!value || value.trim().length < 10) {
          return `Please provide a detailed answer (min 10 characters) for "${q.question}"`;
        }
        break;

      default:
        if (value === "" || value === undefined || value === null) {
          return `Please answer "${q.question}"`;
        }
    }
  }
  return null;
}

function NumberField({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {question.question}
        {question.required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type="number"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function ProgressBar({
  currentStep,
  totalSteps,
  percent,
}: {
  currentStep: number;
  totalSteps: number;
  percent: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
