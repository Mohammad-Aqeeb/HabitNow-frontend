'use client';
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styles from "@/styles/Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import { clearTaskError, deleteSingleTask, fetchSingleTasks, setTaskLoading, updateSingleTask } from "@/slices/taskSlice";
import { fetchCategory } from "@/slices/categorySlice";
import Spinner from "../Spinner/Spinner";

export default function EditTaskPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch()
  const tasks = useSelector((state)=> state.tasks.items);
  const loading = useSelector((state)=> state.tasks.loading);
  const error = useSelector((state)=> state.tasks.error);
  const categories = useSelector((state)=> state.categories.items);

  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("08:00");
  const [priority, setPriority] = useState("Medium");
  const [notes, setNotes] = useState("");
  const [pending, setPending] = useState(true);


  useEffect(() => {
    const fetchTask = async () => {
      try {
        if(tasks.length <= 0){
          await dispatch(fetchSingleTasks()).unwrap();
        }
        const task = tasks.find((task) => {
          return task._id === id;
        });

        setTaskId(task._id);
        setTaskName(task.name || "");
        setSelectedCategory(task.category || "");
        setDate(new Date(task.date));
        setTime(task.time || "08:00");
        setPriority(task.priority || "Medium");
        setNotes(task.description || "");
        setPending(true);

      } catch (err) {
        console.log("Failed to load task data", err);
      }
    };

    const fetchCategories = async () => {
      try {
        await dispatch(fetchCategory()).unwrap();
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    if (id) {
      clearTaskError();
      setTaskLoading(false);
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
      await dispatch(updateSingleTask({id, updatedTask})).unwrap();
      alert("Task updated successfully.");
      router.push("/myTask");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteSingleTask(id)).unwrap();
      alert('Task deleted successfully.');
      router.back();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  if(loading){
    return <Spinner></Spinner>
  }
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
