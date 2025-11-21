"use client";

import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import Card from "@/app/components/ui/Card";
import NumberInput from "@/app/components/ui/NumberInput";
import SelectInput from "@/app/components/ui/SelectInput";
import TextAreaInput from "@/app/components/ui/TextAreaInput";
import TextInput from "@/app/components/ui/TextInput";
import { useAuth } from "@/app/context/AuthContext";
import { useState } from "react";

interface PatientInfoFormProps {
  onNext?: (data: any) => void;
}

export default function PatientInfoForm({ onNext }: PatientInfoFormProps) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    age: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    const age = parseInt(form.age);
    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(age) || age < 18 || age > 120) {
      newErrors.age = "Age must be between 18 and 120";
    }

    if (!form.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required";
    } else if (form.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm() && onNext) {
      onNext(form);
    }
  };

  const isFormValid =
    form.phone.trim() !== "" &&
    form.age !== "" &&
    form.gender !== "" &&
    form.address.trim().length >= 10;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Patient Information
      </h2>
      <p className="text-gray-600 mb-6">
        Please provide your basic details so we can personalize your intake.
      </p>

      <Card>
        <TextInput
          label="Full Name"
          name="fullName"
          value={user?.name || ""}
          placeholder="Enter your full name"
          required
          disabled
          onChange={handleChange}
          className="mb-4 opacity-60 cursor-not-allowed"
        />

        <TextInput
          label="Email"
          onChange={handleChange}
          name="email"
          value={user?.email || ""}
          disabled
          className="mb-4 opacity-60 cursor-not-allowed"
        />

        <div className="mb-4">
          <TextInput
            label="Phone Number"
            name="phone"
            value={form.phone}
            placeholder="+91 98765 43210"
            required
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <NumberInput
              label="Age"
              name="age"
              value={form.age}
              placeholder="Enter your age"
              required
              onChange={handleChange}
            />
            {errors.age && (
              <p className="text-sm text-red-500 mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <SelectInput
              label="Gender"
              name="gender"
              value={form.gender}
              required
              onChange={handleChange}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other / Prefer not to say", value: "other" },
              ]}
            />
            {errors.gender && (
              <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <TextAreaInput
            label="Address"
            name="address"
            value={form.address}
            placeholder="Your residential address"
            rows={1}
            required
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">{errors.address}</p>
          )}
        </div>

        <ButtonPrimary
          label="Continue"
          onClick={handleSubmit}
          disabled={!isFormValid}
        />
      </Card>
    </div>
  );
}
