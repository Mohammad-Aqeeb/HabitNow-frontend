"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import { useTaskContext } from "@/context/TaskProvider";
import axiosInstance from "@/services/axiosInstance";
import styles from "@/styles/MyTask.module.css";

export default function MyTaskPage() {
  const { tasks, setTasks } = useTaskContext();
  const [activeTab, setActiveTab] = useState("single");
  const [singleTasks, setSingleTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (activeTab === "single") {
          const response = await axiosInstance.get("/task/tasks");
          setSingleTasks(response.data.tasks || []);
        } else {
          const response = await axiosInstance.get("/recurringTask/recurring-tasks");
          setRecurringTasks(response.data.recurringTasks || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [activeTab]);

  const renderTasks = () => {
    const currentTasks = activeTab === "single" ? singleTasks : recurringTasks;

    if (!currentTasks.length) {
      return (
        <div className={styles.calendarIconContainer}>
          <div className={styles.calendarIcon}>
            <FaCalendarAlt className={styles.bigIcon} />
            <FaPlus className={styles.addIcon} />
          </div>
          <div className={styles.message}>
            <p>There is nothing scheduled</p>
            <span>Try adding new activities</span>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.taskList}>
        {currentTasks.map((task) => (
          <div key={task._id} className={styles.taskItem}>
            <div>
              {task.name && <p className={styles.taskName}>{task.name}</p>}
              {task.note && <p className={styles.taskNote}>{task.note}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const setValue = null; // You can replace this with logic if needed

  return (
    <div className={styles.taskPage} style={{ marginTop: "100px" }}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "single" ? styles.active : ""}`}
          onClick={() => setActiveTab("single")}
        >
          Single Tasks
        </button>
        <button
          className={`${styles.tab} ${activeTab === "recurring" ? styles.active : ""}`}
          onClick={() => setActiveTab("recurring")}
        >
          Recurring Tasks
        </button>
      </div>

      {/* Content */}
      <div className={styles.content}>{renderTasks()}</div>

      {/* Floating Add Button */}
      {setValue && (
        <button className={styles.floatingButton} onClick={() => setValue("add-task")}>
          <FaPlus />
        </button>
      )}
    </div>
  );
}
