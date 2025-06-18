"use client";

import styles from "@/styles/MyTask.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaCalendarAlt, FaEdit, FaArchive, FaDeaf} from "react-icons/fa";
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar/Navbar";
import ChooseTaskModal from "@/components/ChooseTaskModal/ChooseTaskModal"
import { clearTaskError, fetchSingleTasks, setTaskLoading } from "@/slices/taskSlice";
import { clearError, deleteRecurringTask, fetchRecurringTask, setLoading } from "@/slices/recurringtaskSlice";
import BottomNavbarPage from "@/components/BottomNavbar/BottomNavbarPage";
import Spinner from "../Spinner/Spinner";

export default function MyTaskPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const singleTasks = useSelector((state)=> state.tasks.items);
  const singleTasksLoading = useSelector((state) => state.tasks.loading);
  const singleTasksError = useSelector((state) => state.tasks.loading);
  const recurringTasks = useSelector((state)=> state.recurringtasks.items);
  const recurringtTasksLoading = useSelector((state) => state.recurringtasks.loading);
  const recurringTasksError = useSelector((state) => state.tasks.loading);
  const isLoading = singleTasksLoading || recurringtTasksLoading;
  const error = singleTasksError || recurringTasksError;
  
  const [activeTab, setActiveTab] = useState("single");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecurringTaskModal, setIsRecurringTaskModal] = useState(false);
  const [selectedRecurringTask, setSelectedRecurringTask] = useState(null);

  const handlePlusClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchSingleTasks()).unwrap();
        await dispatch(fetchRecurringTask()).unwrap();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    setTaskLoading(false);
    setLoading(false);
    clearTaskError();
    clearError();
    fetchData();
  }, [activeTab]);

  const handleRecurringTaskDelete = async () => {
    try {
      await dispatch(deleteRecurringTask(selectedRecurringTask._id)).unwrap();
      alert('Task deleted successfully');
      setIsRecurringTaskModal(false);
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

  if(isLoading){
    return <Spinner/>
  }

  if(error){
    return <div>{error}</div>
  }

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

      <BottomNavbarPage></BottomNavbarPage>
      {/* Floating Add Button */}
      <button className={styles.floatingButton} onClick={handlePlusClick}>
        <FaPlus className={styles.plus} />
      </button>

      {isModalOpen && (
        <ChooseTaskModal closeModal={closeModal}/>
      )}

      {
        isRecurringTaskModal && (
        <div className={styles.modalOverlay}
          onClick={() => setIsRecurringTaskModal(false)} 
        > 
        <div className={`${styles.modal} ${styles.modalShow}`}>
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
        </div>
      )}
    </div>
  );
}
