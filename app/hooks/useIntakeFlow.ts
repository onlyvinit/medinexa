"use client";

import { useEffect, useState } from "react";

type IntakeAnswers = Record<string, any>;

interface IntakeFlowState {
  currentStepIndex: number;
  patientInfo: any | null;
  intakeAnswers: IntakeAnswers;
}

const STORAGE_KEY = "intakeFlowState_v1";

function loadInitialState(): IntakeFlowState {
  if (typeof window === "undefined") {
    return {
      currentStepIndex: 0,
      patientInfo: null,
      intakeAnswers: {},
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        currentStepIndex: 0,
        patientInfo: null,
        intakeAnswers: {},
      };
    }
    const parsed = JSON.parse(raw);
    return {
      currentStepIndex: parsed.currentStepIndex ?? 0,
      patientInfo: parsed.patientInfo ?? null,
      intakeAnswers: parsed.intakeAnswers ?? {},
    };
  } catch {
    return {
      currentStepIndex: 0,
      patientInfo: null,
      intakeAnswers: {},
    };
  }
}

export default function useIntakeFlow() {
  const [state, setState] = useState<IntakeFlowState>(() => loadInitialState());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setCurrentStepIndex = (updater: (prev: number) => number) => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: updater(prev.currentStepIndex),
    }));
  };

  const savePatientInfo = (info: any) => {
    setState((prev) => ({
      ...prev,
      patientInfo: info,
      currentStepIndex: 1,
    }));
  };

  const saveBodyMetrics = (metrics: {
    weight: string;
    height: string;
    bmi: number;
    bmiLabel: string;
  }) => {
    setState((prev) => ({
      ...prev,
      intakeAnswers: {
        ...prev.intakeAnswers,
        weight: metrics.weight,
        height: metrics.height,
        bmi: metrics.bmi,
        bmiLabel: metrics.bmiLabel,
      },
      currentStepIndex: prev.currentStepIndex + 1,
    }));
  };

  const saveGenericStepAnswers = (stepAnswers: IntakeAnswers) => {
    setState((prev) => ({
      ...prev,
      intakeAnswers: {
        ...prev.intakeAnswers,
        ...stepAnswers,
      },
      currentStepIndex: prev.currentStepIndex + 1,
    }));
  };

  const goToPreviousStep = () => {
    setState((prev) => ({
      ...prev,
      currentStepIndex: Math.max(0, prev.currentStepIndex - 1),
    }));
  };

  const resetFlow = () => {
    const fresh: IntakeFlowState = {
      currentStepIndex: 0,
      patientInfo: null,
      intakeAnswers: {},
    };
    setState(fresh);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    currentStepIndex: state.currentStepIndex,
    patientInfo: state.patientInfo,
    intakeAnswers: state.intakeAnswers,

    savePatientInfo,
    saveBodyMetrics,
    saveGenericStepAnswers,
    goToPreviousStep,
    resetFlow,
    setCurrentStepIndex,
  };
}
