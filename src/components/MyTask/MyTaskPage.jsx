"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt} from "react-icons/fa";
import { useTaskContext } from "@/context/TaskProvider";
import { useRouter } from "next/navigation"
import axiosInstance from "@/services/axiosInstance";
import styles from "@/styles/MyTask.module.css";
import ChooseTaskModal from "../ChooseTaskModal/ChooseTaskModal";

export default function MyTaskPage() {
  const { tasks, setTasks } = useTaskContext();
  const [activeTab, setActiveTab] = useState("single");
  const [singleTasks, setSingleTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handlePlusClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <div 
              key={task._id} 
              className={styles.taskItem}
              onClick={() => router.push(`/task/${task._id}`)}>
            <div>
              {task.name && <p className={styles.taskName}>{task.name}</p>}
              {task.note && <p className={styles.taskNote}>{task.note}</p>}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
      <button className={styles.floatingButton} onClick={handlePlusClick}>
        <FaPlus className={styles.plus} />
      </button>

      {isModalOpen && (
        <ChooseTaskModal closeModal={closeModal}/>
      )}

    </div>
  );
}
