'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styles from "@/styles/Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/slices/categorySlice";
import { createSingleTask } from "@/slices/taskSlice";

const TaskPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state)=> state.categories.items);
  const loading = useSelector((state)=> state.categories.loading);
  const error = useSelector((state)=> state.categories.error);
  
  const [taskName, setTaskName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("08:00");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(fetchCategory()).unwrap();
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
      pending
    };

    try {
      await dispatch( createSingleTask(taskData)).unwrap();
      console.log("Task Created:", taskData);
      router.back();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create task");
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
          <button className={`${styles.btn} ${styles.cancel}`} onClick={() => router.back()} disabled={loading}>
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
