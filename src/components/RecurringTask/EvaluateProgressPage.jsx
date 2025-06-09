"use client";

import React from "react";
import { useForm } from '@/context/FormContext';
import styles from "@/styles/EvaluateProgressPage.module.css";

const EvaluateProgressPage = ({ onPrevious, onNext, setValue }) => {
  const { formData, updateFormData } = useForm();

  const handleChange = (evaluationType) => {
    setValue(evaluationType);
    updateFormData('frequency', evaluationType);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        How do you want to evaluate your progress?
      </h2>

      <button
        className={styles.primaryButton}
        onClick={() => {
          handleChange("WITH A YES OR NO");
          onNext();
        }}
      >
        WITH A YES OR NO
      </button>

      <button className={styles.secondaryButton} disabled>
        WITH A CHECKLIST (Premium Feature)
      </button>
    </div>
  );
};

export default EvaluateProgressPage;