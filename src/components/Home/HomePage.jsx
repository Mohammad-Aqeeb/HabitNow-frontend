'use client';

import React, { useState, useEffect } from 'react';
import {
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaSyncAlt,
  FaTrophy,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaQuestionCircle,
  FaFilter,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../services/axiosInstance';
import styles from '../../styles/home.module.css';

const HomePage = () => {
  const [singleTasks, setSingleTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('Tue');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, task: null, type: '' });

  const dates = ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleTasksResponse = await axiosInstance.get('/task/tasks');
        setSingleTasks(singleTasksResponse.data.tasks);

        const recurringTasksResponse = await axiosInstance.get('/recurringTask/recurring-tasks');
        setRecurringTasks(recurringTasksResponse.data.recurringTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchData();
  }, []);

  const handleDateClick = (date) => setSelectedDate(date);
  const handlePlusClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEditModalClose = () => setEditModal({ isOpen: false, task: null, type: '' });

  const handleViewTask = (task) => {
    alert(
      `Task Details:\nName: ${task.name}\nDescription: ${task.description || 'No description'}\nDate: ${
        task.date || 'N/A'
      }`
    );
  };

  const openEditModal = (task, type) => setEditModal({ isOpen: true, task, type });

  const saveTaskChanges = async () => {
    try {
      const { task, type } = editModal;
      const url = type === 'single' ? `/task/tasks/${task._id}` : `/recurringTask/recurring-task/${task._id}`;
      await axiosInstance.put(url, task);

      if (type === 'single') {
        setSingleTasks(singleTasks.map((t) => (t._id === task._id ? task : t)));
      } else {
        setRecurringTasks(recurringTasks.map((t) => (t._id === task._id ? task : t)));
      }

      handleEditModalClose();
      alert('Task updated successfully.');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleDelete = async (id, type) => {
    try {
      const url = type === 'single' ? `/task/tasks/${id}` : `/recurringTask/recurring-task/${id}`;
      await axiosInstance.delete(url);

      if (type === 'single') {
        setSingleTasks(singleTasks.filter((task) => task._id !== id));
      } else {
        setRecurringTasks(recurringTasks.filter((task) => task._id !== id));
      }

      alert('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleTaskNavigation = () => router.push('/task');
  const handleHabitNavigation = () => router.push('/habit');
  const handleRecurringNavigation = () => router.push('/recurringTask');

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.navbar}>
        <span className={styles.navbarTitle} style={{ visibility: 'hidden' }}>
          HabitNow
        </span>
        <div className={styles.navbarIcons}>
          <FaSearch className={styles.icon} />
          <FaFilter className={styles.icon} />
          <FaCalendarAlt className={styles.icon} />
          <FaQuestionCircle className={styles.icon} />
        </div>
      </div>

      <div className={styles.dateScroll}>
        {dates.map((date, index) => (
          <div
            key={index}
            className={`${styles.dateItem} ${selectedDate === date ? styles.activeDate : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {date}
          </div>
        ))}
      </div>

      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {singleTasks.length === 0 && recurringTasks.length === 0 ? (
          <div className={styles.calendarIconContainer}>
            <div className={styles.calendarIcon}>
              <FaCalendarAlt className={styles.bigIcon} />
              <FaPlus className={styles.addIcon} />
            </div>
            <div className={styles.message}>
              <p className={styles.messageText}>There is nothing scheduled</p>
              <span className={styles.messageSubtext}>Try adding new activities</span>
            </div>
          </div>
        ) : (
          <>
            {singleTasks.length > 0 && (
              <div>
                <h2 className="mt-5 p-3">Single Tasks</h2>
                <div className={styles.taskCards}>
                  {singleTasks.map((task) => (
                    <div className={styles.taskCard} key={task._id}>
                      <h4 className={styles.taskTitle}>{task.name}</h4>
                      <div className={styles.taskActions}>
                        <FaEye className={styles.viewIcon} onClick={() => handleViewTask(task)} />
                        <FaEdit className={styles.editIcon} onClick={() => openEditModal(task, 'single')} />
                        <FaTrashAlt className={styles.deleteIcon} onClick={() => handleDelete(task._id, 'single')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <hr />

            {recurringTasks.length > 0 && (
              <div>
                <h2 className="mt-5 p-3">Recurring Tasks</h2>
                <div className={`${styles.taskCards} mb-5`}>
                  {recurringTasks.map((task) => (
                    <div className={styles.taskCard} key={task._id}>
                      <h4>{task.name}</h4>
                      <div className={styles.taskActions}>
                        <FaEye className={styles.viewIcon} onClick={() => handleViewTask(task)} />
                        <FaEdit className={styles.editIcon} onClick={() => openEditModal(task, 'recurring')} />
                        <FaTrashAlt className={styles.deleteIcon} onClick={() => handleDelete(task._id, 'recurring')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <button className={styles.fab} onClick={handlePlusClick}>
        <FaPlus className={styles.plus} />
      </button>

      {isModalOpen && (
        <div className={`${styles.modal} ${styles.modalShow}`}>
          <div className={`${styles.modalContent} ${styles.modalShowContent}`}>
            <button className={styles.closeBtn} onClick={closeModal}>X</button>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`} onClick={handleHabitNavigation}>
              <div style={{ display: 'flex' }}>
                <FaTrophy className={styles.modalIcon} />
                <p>Habit</p>
              </div>
              <span>Activity that repeats over time. It has detailed tracking and statistics.</span>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`} onClick={handleRecurringNavigation}>
              <div style={{ display: 'flex' }}>
                <FaSyncAlt className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Recurring Task</p>
              </div>
              <span className={styles.modalOptionSubtext}>Activity that repeats over time without tracking or statistics.</span>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`} onClick={handleTaskNavigation}>
              <div style={{ display: 'flex' }}>
                <FaCheckCircle className={styles.modalIcon} />
                <p>Task</p>
              </div>
              <span>Single instance activity without tracking over time.</span>
            </div>
          </div>
        </div>
      )}

      {editModal.isOpen && (
        <div className={`${styles.modalEditTask} ${styles.show}`}>
          <div className={styles.modalContentEdit}>
            <button className={styles.closeBtnEdit} onClick={handleEditModalClose}>X</button>
            <h3 className={styles.modalHeader}>Edit Task</h3>
            <form className={styles.editTaskForm}>
              <label className={styles.editTaskLabel}>
                Task Name:
                <input
                  className={styles.editTaskInput}
                  type="text"
                  value={editModal.task.name}
                  onChange={(e) =>
                    setEditModal({ ...editModal, task: { ...editModal.task, name: e.target.value } })
                  }
                />
              </label>
              <label className={styles.editTaskLabel}>
                Task Description:
                <textarea
                  className={styles.editTaskTextarea}
                  value={editModal.task.description || ''}
                  onChange={(e) =>
                    setEditModal({ ...editModal, task: { ...editModal.task, description: e.target.value } })
                  }
                />
              </label>
              <button type="button" className={styles.editTaskBtn} onClick={saveTaskChanges}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;