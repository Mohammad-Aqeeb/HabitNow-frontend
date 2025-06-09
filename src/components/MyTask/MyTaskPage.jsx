"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlus, FaCalendarAlt, FaEdit, FaArchive, FaDeaf, FaSearch} from "react-icons/fa";
import { useTaskContext } from "@/context/TaskProvider";
import { useRouter } from "next/navigation"
import axiosInstance from "@/services/axiosInstance";
import styles from "@/styles/MyTask.module.css";
import ChooseTaskModal from "../ChooseTaskModal/ChooseTaskModal";
import Navbar from "@/components/Navbar/Navbar";

export default function MyTaskPage() {
  const { tasks, setTasks } = useTaskContext();
  const [activeTab, setActiveTab] = useState("single");
  const [singleTasks, setSingleTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecurringTaskModal, setIsRecurringTaskModal] = useState(false);
  const [selectedRecurringTask, setSelectedRecurringTask] = useState(null);

  const router = useRouter();
  const modalRef = useRef(null);

  const handlePlusClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  useEffect(() => {
    fetchTasks();
  }, [activeTab]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isRecurringTaskModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setIsRecurringTaskModal(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isRecurringTaskModal]);


  const handleRecurringTaskDelete = async () => {
    try {
      await axiosInstance.delete(`/recurringTask/recurring-task/${selectedRecurringTask._id}`);

      alert('Task deleted successfully.');
      setIsRecurringTaskModal(false);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

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

        {
          activeTab === "single" ? 

            (currentTasks.map((task) => (
              <div
                key={task._id} 
                className={styles.taskItem}
                onClick={() => router.push(`/task/${task._id}`)}
              >
                <div>
                  {task.name && <p className={styles.taskName}>{task.name}</p>}
                  {task.note && <p className={styles.taskNote}>{task.note}</p>}
                </div>
              </div>
            )))   
          : 
          (
            (currentTasks.map((task) => (
              <div
                key={task._id} 
                className={styles.taskItem}
                onClick={() => {
                  setIsRecurringTaskModal(true)
                  setSelectedRecurringTask(task)
                }}
                >
                <div>
                  {task.name && <p className={styles.taskName}>{task.name}</p>}
                  {task.note && <p className={styles.taskNote}>{task.note}</p>}
                </div>
              </div>
            )))
          )
        }
      </div>
    );
  };

  return (
    <div className={styles.taskPage}>

      <Navbar></Navbar>
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

      {
        isRecurringTaskModal && (
        <div 
          className={`${styles.modal} ${styles.modalShow}`}
          onClick={() => setIsRecurringTaskModal(false)} 
          ref={modalRef}
        >
          <div 
            className={`${styles.modalContent} ${styles.modalShowContent}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalRecurringTasktitleContainer}>
              <div className={styles.modalRecurringTasktitle}>
                <div>{selectedRecurringTask.name}</div>
                <p className={styles.modalRecurringTasksubText}>{selectedRecurringTask.customFrequency}</p>
                <p className={styles.modalRecurringTaskText}>{selectedRecurringTask.description}</p>
              </div>
              <div>
                <img src={selectedRecurringTask.category.icon} alt="icon" />
              </div>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
              <div style={{ display: 'flex' }}>
                <FaCalendarAlt className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Calender</p>
              </div>
            </div>

            <div
              className={`${styles.modalOption} ${styles.modalOptionShow}`}
              onClick={()=>{router.push(`/recurringTask/${selectedRecurringTask._id}`)}}
            >
              <div style={{ display: 'flex' }}>
                <FaEdit className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Edit</p>
              </div>
            </div>
            <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
              <div style={{ display: 'flex' }}>
                <FaArchive className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Archive</p>
              </div>
            </div>

            <div 
              className={`${styles.modalOption} ${styles.modalOptionShow}`}
              onClick={handleRecurringTaskDelete}
            >
              <div style={{ display: 'flex' }}>
                <FaDeaf className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Delete</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
