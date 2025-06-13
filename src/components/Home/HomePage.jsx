'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  FaCalendarAlt,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrashAlt,
  // FaSearch,
  // FaQuestionCircle,
  // FaFilter,
} from 'react-icons/fa';
import axiosInstance from '@/services/axiosInstance';
import styles from '@/styles/home.module.css';
import ChooseTaskModal from '../ChooseTaskModal/ChooseTaskModal';
import Navbar from '../Navbar/Navbar';

import dayjs from 'dayjs';
import Rate from '../Rate/Rate';

const HomePage = () => {
  const [singleTasks, setSingleTasks] = useState([]);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, task: null, type: '' });
  const isRatePage = false

  const startDate = dayjs().subtract(80, 'day');
  const dates = Array.from({ length: 161 }, (_, i) => startDate.add(i, 'day'));
  const dateRefs = useRef([]);
  dateRefs.current = [];

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

  useEffect(() => {
    const index = dates.findIndex((date) => date.isSame(selectedDate, 'day'));
    if (index !== -1 && dateRefs.current[index]) {
      dateRefs.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedDate, dates]);

  const handleDateClick = (date) => setSelectedDate(date);
  const handlePlusClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEditModalClose = () => setEditModal({ isOpen: false, task: null, type: '' });

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

  const handleTaskCheck = async (id) => {
    try {
      const updatedTasks = singleTasks.map((task) => {
        if (task._id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      setSingleTasks(updatedTasks);

      const taskToUpdate = updatedTasks.find((t) => t._id === id);
      await axiosInstance.put(`/task/tasks/${id}`, taskToUpdate);
    } catch (error) {
      console.error('Failed to update task completion:', error);
    }
  };

  const handleRecurringCheck = async (id) => {
    try {
      const updatedTasks = recurringTasks.map((task) => {
        if (task._id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      setRecurringTasks(updatedTasks);

      const taskToUpdate = updatedTasks.find((t) => t._id === id);
      await axiosInstance.put(`/recurringTask/recurring-task/${id}`, taskToUpdate);
    } catch (error){
      console.error('Failed to update task completion:', error);
    }
  };

  return (
    <div className={styles.homepageContainer}>
      <Navbar selectedDate={selectedDate}></Navbar>

      <div className={styles.dateScroll}>
        {dates.map((date, index) => (
          <div
            key={index}
            ref={(el) => (dateRefs.current[index] = el)}
            className={`${styles.dateItem} ${date.isSame(selectedDate, 'day') ? styles.activeDate : ''}`}
            onClick={() => handleDateClick(date)}
          >
            <div>{date.format('ddd')}</div>
            <div>{date.format('DD')}</div>
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
            {/* {singleTasks.length > 0 && (
              <div>
                <h2 className={styles.singleTaskH2}>Single Tasks</h2>
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
            )} */}
            {singleTasks.length > 0 &&
              singleTasks.map((task) => (
                <div key={task._id} className={styles.taskItem}>
                  <div>
                    <div>
                      {task.name && <p className={styles.taskName}>{task.name}</p>}
                      {task.note && <p className={styles.taskNote}>{task.note}</p>}
                    </div>
                    <p className={styles.taskCaption}>Task</p>
                  </div>

                  <div
                      className={`${styles.checkCircle} ${task.completed ? styles.checked : ""}`}
                      onClick={() => handleTaskCheck(task._id)}
                    >
                      {task.completed && "✔"}
                  </div>
                </div>
              ))
            }


            {/* {recurringTasks.length > 0 && (
              <div className={styles.recurringTaskContainer}>
                <h2 className={styles.recurringTaskH2}>Recurring Tasks</h2>
                <div className={styles.taskCards}>
                  {recurringTasks.map((task) => (
                    <div className={styles.taskCard} key={task._id}>
                      <h4 className={styles.taskTitle}>{task.name}</h4>
                      <div className={styles.taskActions}>
                        <FaEye className={styles.viewIcon} onClick={() => handleViewTask(task)} />
                        <FaEdit className={styles.editIcon} onClick={() => openEditModal(task, 'recurring')} />
                        <FaTrashAlt className={styles.deleteIcon} onClick={() => handleDelete(task._id, 'recurring')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            { recurringTasks.length > 0 && (
              recurringTasks.map((task) => (
                <div key={task._id} className={styles.taskItem}>
                  <div>
                    <div>
                      {task.name && <p className={styles.taskName}>{task.name}</p>}
                      {task.note && <p className={styles.taskNote}>{task.note}</p>}
                    </div>
                    <p className={styles.taskCaption}>recurring Task</p>
                  </div>
                  <div
                      className={`${styles.checkCircle} ${task.completed ? styles.checked : ""}`}
                      onClick={() => handleRecurringCheck(task._id)}
                  >
                      {task.completed && "✔"}
                  </div>
                </div>
              )))
            }
          </>
        )}
      </div>

      <button className={styles.fab} onClick={handlePlusClick}>
        <FaPlus className={styles.plus} />
      </button>

      {isModalOpen && (
        <ChooseTaskModal closeModal={closeModal}/>
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

      {
        isRatePage && (
          <Rate></Rate>
        )
      }
    </div>
  );
};

export default HomePage;