"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "@/context/FormContext";
import styles from "@/styles/WhenToDoItPage.module.css";
import { FaBell, FaCalendarAlt, FaClock, FaFlag } from "react-icons/fa";

const WhenToDoItPage = ({ onPrevious, onNext, onSave }) => {
  const { formData, updateFormData } = useForm();

  const [startDate, setStartDate] = useState(new Date()); // Default to today's date
  const [endDateEnabled, setEndDateEnabled] = useState(false);
  const [endDate, setEndDate] = useState(null);
  const [reminders, setTimeReminders] = useState(0);
  const [priority, setPriority] = useState("Medium");
  const [taskTime, setTaskTime] = useState("08:00"); // Time input field

  const handleSaveClick = () => {
    const formDataToSave = {
      category: formData.category,
      name: formData.page3Data?.name,
      description: formData.page3Data?.note,
      frequency: formData.frequency,
      customFrequency: formData.customFrequency,
      startDate,
      endDateEnabled,
      endDate,
      priority,
      reminders,
      time: taskTime,
    };

    updateFormData("page5Data", formDataToSave);

    if (onSave) {
      onSave(formDataToSave);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>When do you want to do it?</h2>

      <div className={styles.optionContainer}>
        {/* Start Date */}
        <div className={styles.option}>
          <div className={styles.optionLabel}>
            <FaCalendarAlt className={styles.icon}/>
            Start date
          </div>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            dateFormat="MM/dd/yyyy"
            todayButton="Today"
            className={styles.datePicker}
          />
        </div>

        {/* End Date */}
        <div className={styles.option}>
          <div className={styles.optionLabel}>
            <FaCalendarAlt className={styles.icon}/>
            End date
          </div>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={endDateEnabled}
              onChange={() => setEndDateEnabled(!endDateEnabled)}
            />
            <span
              className={styles.slider}
              style={{ backgroundColor: endDateEnabled ? "#ff4d6d" : "#555" }}
            />
          </label>
          {endDateEnabled && (
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select End Date"
              className={styles.datePicker}
            />
          )}
        </div>

        {/* Time Picker */}
        <div className={styles.option}>
          <div className={styles.optionLabel}>
            <FaClock className={styles.icon}/>
            Select Time
          </div>
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className={styles.optionButton}
          />
        </div>

        {/* Reminders Input */}
        <div className={styles.option}>
          <div className={styles.optionLabel}>
            <FaBell className={styles.icon}/>
            Reminders
          </div>
          <input
            type="number"
            min="0"
            value={reminders}
            onChange={(e) => setTimeReminders(e.target.value)}
            className={styles.optionButton}
          />
        </div>

        {/* Priority Dropdown */}
        <div className={styles.option}>
          <div className={styles.optionLabel}>
            <FaFlag className={styles.icon}/>
            Priority
          </div>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={styles.optionButton}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className={styles.footer}>
        <button className={styles.backButton} onClick={onPrevious}>
          Back
        </button>
        <button className={styles.saveButton} onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default WhenToDoItPage;