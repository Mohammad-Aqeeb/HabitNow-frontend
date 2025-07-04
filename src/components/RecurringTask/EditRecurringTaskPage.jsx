'use client';
import styles from "@/styles/Task.module.css";
import { MdArchive, MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/services/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecurringTask, fetchRecurringTask, updateRecurringTask } from "@/slices/recurringtaskSlice";
import { fetchCategory } from "@/slices/categorySlice";

export default function EditRecurringTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch()
  const recurringTasks = useSelector((state)=> state.recurringtasks.items);
  const loading = useSelector((state)=> state.recurringtasks.loading);
  const error = useSelector((state)=> state.recurringtasks.error);
  const categories = useSelector((state)=> state.categories.items);

  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [time, setTime] = useState("08:00");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("");
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if(recurringTasks.length <= 0){
          await dispatch(fetchRecurringTask()).unwrap();
        }
        const task = recurringTasks.find((task) => {
          return task._id === id;
        });

        setTaskId(task._id);
        setTaskName(task.name || "");
        setSelectedCategory(task.category || "");
        setStartDate(new Date(task.startDate));
        setEndDate(new Date(task.endDate) || null);
        setTime(task.time || "08:00");
        setPriority(task.priority || "Medium");
        setNotes(task.description || "");
        setFrequency(task.customFrequency)
        setPending(true);

      } catch (err) {
        console.log("Failed to load task data" );
      }
    };

    const fetchCategories = async () => {
      try {
        await dispatch(fetchCategory()).unwrap();
      } catch (err) {
        console.error(err ||"Error fetching categories", err);
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
      startDate,
      time,
      category: selectedCategory,
      reminders: [],
      priority,
      customFrequency : frequency
    };

    try {
      await dispatch(updateRecurringTask({id, updatedTask})).unwrap();
      alert("Task updated successfully.");
      router.push("/myTask");
    } catch (err) {
      console.log(err.message || "Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRecurringTask(id)).unwrap();
      alert('Task deleted successfully.');
      router.back();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <div className={styles.taskContainer}>
      <h2 className={styles.taskTitle}>Edit Recurring Task</h2>

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


        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>Description</label>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          ></textarea>
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
          <label>Frequency</label>
          <select
            className={styles.input}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="Every day">Every day</option>
            <option value="Specific days of the week">Specific days of the week</option>
            <option value="Specific days of the month">Specific days of the month</option>
            <option value="Specific days of the year">Specific days of the year</option>
            <option value="Some days per year">Some days per year</option>
            <option value="Repeat">Repeat</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            className={styles.input}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className={styles.formGroup}>
          <label>End date</label>
          <DatePicker
            selected={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            className={styles.input}
            dateFormat="yyyy-MM-dd"
          />
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

        <button className={styles.delete}> 
            <MdArchive /> 
            <div>Archive</div>
        </button>

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
