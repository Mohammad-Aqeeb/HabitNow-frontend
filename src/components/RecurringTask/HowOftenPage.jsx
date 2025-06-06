"use client";

import React, { useState } from "react";
import { useForm } from "@/context/FormContext";
import styles from "@/styles/HowOftenPage.module.css";

const HowOftenPage = ({ onPrevious, onNext, setValue }) => {
  const { updateFormData } = useForm();
  const [selectedOption, setSelectedOption] = useState("Every day");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setValue(value);
    updateFormData("customFrequency", value);
  };

  const options = [
    "Every day",
    "Specific days of the week",
    "Specific days of the month",
    "Specific days of the year",
    "Some days per period",
    "Repeat",
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>How often do you want to do it?</h2>

      <div className={styles.radioContainer}>
        {options.map((option) => (
          <label key={option} className={styles.radioLabel}>
            <input
              type="radio"
              name="frequency"
              value={option}
              checked={selectedOption === option}
              onChange={handleChange}
              className={styles.radioInput}
            />
            {option}
          </label>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button className={styles.nextButton} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HowOftenPage;