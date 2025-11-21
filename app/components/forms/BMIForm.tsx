"use client";

import { useEffect, useState } from "react";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import Card from "@/app/components/ui/Card";

interface BMIFormProps {
  onNext: (data: {
    weight: string;
    height: string;
    bmi: number;
    bmiLabel: string;
  }) => void;
  onBack?: () => void;
}

export default function BMIForm({ onNext, onBack }: BMIFormProps) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiLabel, setBmiLabel] = useState("");
  const [errors, setErrors] = useState<{ weight?: string; height?: string }>(
    {}
  );

  const validateInputs = (w: string, h: string) => {
    const newErrors: { weight?: string; height?: string } = {};

    const weightNum = parseFloat(w);
    const heightNum = parseFloat(h);

    if (w && (isNaN(weightNum) || weightNum < 20 || weightNum > 300)) {
      newErrors.weight = "Weight must be between 20 and 300 kg";
    }

    if (h && (isNaN(heightNum) || heightNum < 100 || heightNum > 250)) {
      newErrors.height = "Height must be between 100 and 250 cm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateBMI = (w: string, h: string) => {
    const weightNum = parseFloat(w);
    const heightNum = parseFloat(h);

    if (!weightNum || !heightNum || !validateInputs(w, h)) {
      setBmi(null);
      setBmiLabel("");
      return;
    }

    const meters = heightNum / 100;
    const value = weightNum / (meters * meters);

    const rounded = parseFloat(value.toFixed(1));
    setBmi(rounded);

    if (rounded < 18.5) setBmiLabel("Underweight");
    else if (rounded < 25) setBmiLabel("Normal");
    else if (rounded < 30) setBmiLabel("Overweight");
    else setBmiLabel("Obese");
  };

  useEffect(() => {
    calculateBMI(weight, height);
  }, [weight, height]);

  const handleSubmit = () => {
    if (!weight || !height) {
      setErrors({
        weight: !weight ? "Weight is required" : undefined,
        height: !height ? "Height is required" : undefined,
      });
      return;
    }

    if (!bmi || !bmiLabel || Object.keys(errors).length > 0) return;

    onNext({
      weight,
      height,
      bmi,
      bmiLabel,
    });
  };

  const isFormValid =
    weight !== "" &&
    height !== "" &&
    bmi !== null &&
    Object.keys(errors).length === 0;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Body Metrics
        </h2>
        <p className="text-gray-600 mb-6">
          Enter your height and weight so we can calculate your BMI.
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Weight (kg) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
                if (errors.weight) setErrors({ ...errors, weight: undefined });
              }}
              placeholder="e.g., 70"
              min="20"
              max="300"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.weight && (
              <p className="text-sm text-red-500">{errors.weight}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Height (cm) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
                if (errors.height) setErrors({ ...errors, height: undefined });
              }}
              placeholder="e.g., 170"
              min="100"
              max="250"
              step="0.1"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.height && (
              <p className="text-sm text-red-500">{errors.height}</p>
            )}
          </div>

          {bmi && (
            <div className="mt-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-lg font-semibold text-blue-900">
                BMI: {bmi} ({bmiLabel})
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3 justify-between">
          {onBack && (
            <ButtonPrimary label="Back" onClick={onBack} type="button" />
          )}

          <ButtonPrimary
            label="Continue"
            onClick={handleSubmit}
            disabled={!isFormValid}
          />
        </div>
      </Card>
    </div>
  );
}
