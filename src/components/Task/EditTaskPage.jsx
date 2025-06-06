'use client';
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styles from "@/styles/Task.module.css";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();

  const [taskId, setTaskId] = useState("");
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

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/task/tasks/${id}`);
        const task = res.data;

        setTaskId(task._id);
        setTaskName(task.name || "");
        setSelectedCategory(task.category || "");
        setDate(new Date(task.date));
        setTime(task.time || "08:00");
        setPriority(task.priority || "Medium");
        setNotes(task.description || "");
        setPending(true);

      } catch (err) {
        setError("Failed to load task data");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    if (id) {
      fetchTask();
      fetchCategories();
    }
  }, [id]);

  const handleUpdate = async () => {
    const updatedTask = {
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
      await axiosInstance.put(`/task/tasks/${id}`, updatedTask);
      setLoading(false);
      alert("Task updated successfully.");
      router.push("/myTask");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/task/tasks/${taskId}`);

    //   if (type === 'single') {
    //     setSingleTasks(singleTasks.filter((task) => task._id !== id));
    //   } else {
    //     setRecurringTasks(recurringTasks.filter((task) => task._id !== id));
    //   }

      alert('Task deleted successfully.');
      router.back();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className={styles.taskContainer}>
      <h2 className={styles.taskTitle}>Edit Task</h2>

      {error && <div className={styles.errorAlert}>{error}</div>}

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Task</label>
          <input
            type="text"
            className={styles.input}
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

        <button className={styles.delete} onClick={handleDelete}> 
            <MdDeleteForever /> 
            <div>Delete</div>
        </button>
        <div className={styles.buttonGroup}>
          <button className={`${styles.btn} ${styles.cancel}`} onClick={() => router.back()} disabled={loading}>
            Cancel
          </button>
          <button className={`${styles.btn} ${styles.confirm}`} onClick={handleUpdate} disabled={loading}>
            {loading ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
