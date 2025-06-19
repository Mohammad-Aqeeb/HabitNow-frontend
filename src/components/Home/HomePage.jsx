'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaCalendarAlt, FaPlus } from 'react-icons/fa';
import { RiMessage2Line } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";
import { ImPencil } from "react-icons/im";

import styles from '@/styles/home.module.css';
import ChooseTaskModal from '../ChooseTaskModal/ChooseTaskModal';
import Navbar from '../Navbar/Navbar';

import dayjs from 'dayjs';

import { useDispatch, useSelector } from 'react-redux';
import {fetchSingleTasks, toggleTaskCompletion } from '@/slices/taskSlice';
import { fetchRecurringTask, toggleRecurringTaskCompletion, toggleRecurringTaskCompletionDone, toggleRecurringTaskCompletionPending, updateRecurringTask } from '@/slices/recurringtaskSlice';
import BottomNavbarPage from '../BottomNavbar/BottomNavbarPage';
import Spinner from '../Spinner/Spinner';
import { MdOutlineCalendarMonth, MdOutlineNotificationsOff, MdRemoveCircleOutline } from 'react-icons/md';
import { IoMdSync } from 'react-icons/io';
import { useRouter } from 'next/navigation';


const HomePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const singleTasks = useSelector((state) => state.tasks.items);
  const singleTasksLoading = useSelector((state) => state.tasks.loading);
  const singleTasksError = useSelector((state) => state.tasks.loading);
  const recurringTasks = useSelector((state) => state.recurringtasks.items);
  const recurringtTasksLoading = useSelector((state) => state.recurringtasks.loading);
  const recurringTasksError = useSelector((state) => state.tasks.loading);
  const isLoading = singleTasksLoading || recurringtTasksLoading;
  const error = singleTasksError || recurringTasksError;

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecurringTaskModal, setIsRecurringTaskModal] = useState(false);
  const [selectedRecurringTask, setSelectedRecurringTask] = useState(null);

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
      // const task = singleTasks.find(t => t._id === id);
      // if (task) {
      //   await dispatch(updateSingleTask({id: id, updatedTask : { ...task, completed: !task.completed }})).unwrap();
      // }
    } catch (error) {
      console.error('Failed to update task completion:', error);
    }
  };

  const handleRecurringCheck = async (id) => {
    try {
      dispatch(toggleRecurringTaskCompletion(id));
      // const task = recurringTasks.find(t => t._id=== id);
      // if(task){
      //   await dispatch(updateRecurringTask({id : id, updatedTask : { ...task, completed: !task.completed }})).unwrap();
      // }
    } catch (error){
      console.error('Failed to update task completion:', error);
    }
  };

  if(isLoading){
    return <Spinner/>
  }
  if(error){
    return <div>Error...</div>
  }
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
                <div key={task._id} className={styles.taskItem} onClick={() => {
                  setIsRecurringTaskModal(true)
                  setSelectedRecurringTask(task)
                }}>
                  <div>
                    <div>
                      {task.name && <p className={styles.taskName}>{task.name}</p>}
                      {task.note && <p className={styles.taskNote}>{task.note}</p>}
                    </div>
                    <p className={styles.taskCaption}>recurring Task</p>
                  </div>
                  <div
                      className={`${styles.checkCircle} ${task.completed ? styles.checked : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRecurringCheck(task._id);
                      }}
                  >
                      {task.completed && "✔"}
                  </div>
                </div>
              )))
            }
          </>
        )}
      </div>

      <BottomNavbarPage></BottomNavbarPage>
      <button className={styles.fab} onClick={handlePlusClick}>
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
                <p className={styles.modalRecurringTasksubText}>{selectedDate.format('MM/DD/YYYY')}</p>
                <p className={styles.modalRecurringTaskText}>{selectedRecurringTask.description}</p>
              </div>
              <div>
                <img src={selectedRecurringTask.category.icon} alt="icon" />
              </div>
            </div>

            <div>
              <div className={styles.iconBox}>
                <div className={styles.calenderIconBox} 
                  onClick={()=>{
                    dispatch(toggleRecurringTaskCompletionPending(selectedRecurringTask._id));
                    setIsRecurringTaskModal(false)
                  }}
                >
                  Pending
                </div>
                <div className={styles.pencilIconBox}
                  onClick={()=>{
                    dispatch(toggleRecurringTaskCompletionDone(selectedRecurringTask._id));
                    setIsRecurringTaskModal(false)
                  }}
                >
                  Done
                </div>
              </div>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
              <div style={{ display: 'flex' }}
                onClick={()=>{router.push(`/recurringTask/${selectedRecurringTask._id}`)}}
              >
                <MdOutlineNotificationsOff className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Add reminder ...</p>
              </div>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
              <div style={{ display: 'flex' }}>
                <RiMessage2Line className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Add note ...</p>
              </div>
            </div>

            <div 
              className={`${styles.modalOption} ${styles.modalOptionShow}`}
            >
              <div style={{ display: 'flex' }}>
                <GrPowerReset  className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Reschedule</p>
              </div>
            </div>

            <div 
              className={`${styles.modalOption} ${styles.modalOptionShow}`}
            >
              <div style={{ display: 'flex' }}>
                <MdRemoveCircleOutline className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Skip</p>
              </div>
            </div>

            <div 
              className={`${styles.modalOption} ${styles.modalOptionShow}`}
            >
              <div style={{ display: 'flex' }}>
                <IoMdSync className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Reset entry</p>
              </div>
            </div>
            
            <div>
              <div className={styles.iconBox}>
                <div className={styles.calenderIconBox}>
                  <MdOutlineCalendarMonth className={styles.modalIcon}/>
                </div>
                <div className={styles.pencilIconBox} 
                  onClick={()=>{router.push(`/recurringTask/${selectedRecurringTask._id}`)}}
                >
                  <ImPencil className={styles.modalIcon} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;