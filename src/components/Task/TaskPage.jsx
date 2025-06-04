'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styles from "@/styles/Task.module.css";

const TaskPage = () => {
  const [taskName, setTaskName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("08:00");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleConfirm = async () => {
    const taskData = {
      name: taskName,
      description: notes,
      date,
      time,
      category: selectedCategory,
      reminders: [],
      priority,
    };

    try {
      setLoading(true);
      const response = await axiosInstance.post("/task/tasks", taskData);
      console.log("Task Created:", response.data);
      setLoading(false);
      router.push("/myTask");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
      setLoading(false);
    }
  };

  return (
    <div className={styles.taskContainer}>
  <h2 className={styles.taskTitle}>New Task</h2>

  {error && <div className={styles.errorAlert}>{error}</div>}

  <div className={styles.formGrid}>
    <div className={styles.formGroup}>
      <label>Task</label>
      <input
        type="text"
        className={styles.input}
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
    </div>

    <div className={styles.formGroup}>
      <label>Category</label>
      <select
        className={styles.input}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.formGroup}>
      <label>Date</label>
      <DatePicker
        selected={date}
        onChange={(newDate) => setDate(newDate)}
        className={styles.input}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />
    </div>

    <div className={styles.formGroup}>
      <label>Time</label>
      <TimePicker
        onChange={setTime}
        value={time}
        format="HH:mm"
        className={styles.input}
      />
    </div>

    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
      <label>Priority</label>
      <select
        className={styles.input}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </div>

    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
      <label>Notes</label>
      <textarea
        className={`${styles.input} ${styles.textarea}`}
        placeholder="Add details about this task"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
      ></textarea>
    </div>

    <div className={styles.checkboxGroup}>
      <input
        type="checkbox"
        id="pendingCheck"
        checked={pending}
        onChange={() => setPending(!pending)}
      />
      <label htmlFor="pendingCheck">Pending Task</label>
    </div>

    <div className={styles.buttonGroup}>
      <button className={`${styles.btn} ${styles.cancel}`} onClick={() => router.push('/')} disabled={loading}>
        Cancel
      </button>
      <button className={`${styles.btn} ${styles.confirm}`} onClick={handleConfirm} disabled={loading}>
        {loading ? "Saving..." : "Confirm"}
      </button>
    </div>
  </div>
</div>

  );
};

export default TaskPage;