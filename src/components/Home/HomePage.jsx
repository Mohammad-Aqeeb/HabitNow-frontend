'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import styles from '@/styles/home.module.css';
import ChooseTaskModal from '../ChooseTaskModal/ChooseTaskModal';
import Navbar from '../Navbar/Navbar';

import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import {fetchSingleTasks, toggleTaskCompletion, updateSingleTask } from '@/slices/taskSlice';
import { fetchRecurringTask, toggleRecurringTaskCompletion, updateRecurringTask } from '@/slices/recurringtaskSlice';


const HomePage = () => {
  const dispatch = useDispatch();
  const singleTasks = useSelector((state) => state.tasks.items);
  const recurringTasks = useSelector((state) => state.recurringtasks.items);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const startDate = dayjs().subtract(80, 'day');
  const dates = Array.from({ length: 161 }, (_, i) => startDate.add(i, 'day'));
  const dateRefs = useRef([]);
  dateRefs.current = [];

  const handleDateClick = (date) => setSelectedDate(date);
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
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const index = dates.findIndex((date) => date.isSame(selectedDate, 'day'));
    if (index !== -1 && dateRefs.current[index]) {
      dateRefs.current[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [selectedDate, dates]);

  const handleTaskCheck = async (id) => {
    try {
      dispatch(toggleTaskCompletion(id));
      const task = singleTasks.find(t => t._id === id);
      if (task) {
        await dispatch(updateSingleTask({ ...task, completed: !task.completed })).unwrap();
      }
    } catch (error) {
      console.error('Failed to update task completion:', error);
    }
  };

  const handleRecurringCheck = async (id) => {
    try {
      dispatch(toggleRecurringTaskCompletion(id));
      const task = recurringTasks.find(t => t._id=== id);
      if(task){
        dispatch(updateRecurringTask({ ...task, completed: !task.completed }));
      }
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
    </div>
  );
};

export default HomePage;