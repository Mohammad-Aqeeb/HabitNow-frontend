"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EvaluateProgressPage from "@/components/RecurringTask/EvaluateProgressPage";
import CategorySelectionPage from "@/components/RecurringTask/CategorySelectionPage";
import DefineTaskPage from "@/components/RecurringTask/DefineTaskPage";
import HowOftenPage from "@/components/RecurringTask/HowOftenPage";
import WhenToDoItPage from "@/components/RecurringTask/WhenToDoItPage";
import axiosInstance from "@/services/axiosInstance";

function RecurringTaskPage() {
  const [step, setStep] = useState(0);

  const [component1Value, setComponent1Value] = useState(null);
  const [component2Value, setComponent2Value] = useState(null);
  const [component3Value, setComponent3Value] = useState(null);
  const [component4Value, setComponent4Value] = useState(null);
  const [component5Value, setComponent5Value] = useState(null);

  const finalArray = [
    component1Value,
    component2Value,
    component3Value,
    component4Value,
    component5Value,
  ];

  const router = useRouter();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const previousStep = () => setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));

  const handleSave = async (savedData) => {
    try {
      const response = await axiosInstance.post(
        "/recurringTask/recurring-task",
        savedData
      );
      console.log("Saved form data:", response);

      alert("Task saved successfully!");
      router.push("/");
    } catch (err) {
      console.error("Error saving task", err);
      alert("Failed to save the task. Please try again.");
    }
  };

  return (
    <div>
      {step === 0 && (
        <CategorySelectionPage
          onNext={nextStep}
          setValue={setComponent1Value}
        />
      )}
      {step === 1 && (
        <EvaluateProgressPage
          onNext={nextStep}
          setValue={setComponent2Value}
          onPrevious={previousStep}
        />
      )}
      {step === 2 && (
        <DefineTaskPage
          onNext={nextStep}
          setValue={setComponent3Value}
          onPrevious={previousStep}
        />
      )}
      {step === 3 && (
        <HowOftenPage
          onNext={nextStep}
          setValue={setComponent4Value}
          onPrevious={previousStep}
        />
      )}
      {step === 4 && (
        <WhenToDoItPage
          onSave={handleSave}
          setValue={setComponent5Value}
          onPrevious={previousStep}
        />
      )}
    </div>
  );
}

export default RecurringTaskPage;