"use client";

import React, { useState } from "react";
import { useForm } from '@/context/FormContext';
import styles from "@/styles/DefineTaskPage.module.css";

const DefineTaskPage = ({ onNext, onPrevious, setValue }) => {
  const { updateFormData } = useForm();

  const [taskName, setTaskName] = useState("");
  const [taskNote, setTaskNote] = useState("");

  const handleSave = () => {
    if (!taskName.trim()) {
      alert("Task Name is required!");
      return;
    }

    const taskData = { name: taskName.trim(), note: taskNote.trim() };
    setValue(taskData);
    updateFormData("page3Data", taskData);
    onNext();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Define Your Task</h2>

      <input
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className={styles.input}
      />

      <textarea
        placeholder="Add a Note (Optional)"
        value={taskNote}
        onChange={(e) => setTaskNote(e.target.value)}
        className={styles.textarea}
      ></textarea>

      <div className={styles.footer}>
        <button className={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button
          className={styles.saveButton}
          onClick={() => {
            handleSave();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DefineTaskPage;