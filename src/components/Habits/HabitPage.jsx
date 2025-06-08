// pages/habits/index.js (or wherever you're placing it)

import React, { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import style from "@/styles/Habit.module.css";
import Navbar from "../Navbar/Navbar";

const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    frequency: "daily",
    startDate: "",
    endDate: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axiosInstance.get("/habit/habits");
        setHabits(response.data.data);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    const { name, description, frequency, startDate, endDate } = newHabit;
    if (name.trim()) {
      try {
        if (editingHabit) {
          const response = await axiosInstance.put(`/habit/habits/${editingHabit}`, {
            complete: true,
            date: new Date(),
          });

          setHabits(habits.map(habit => (habit._id === editingHabit ? response.data.data : habit)));
          setEditingHabit(null);
        } else {
          const response = await axiosInstance.post("/habit/habits", {
            name,
            description,
            frequency,
            startDate,
            endDate,
          });

          setHabits([...habits, response.data.data]);
        }

        setNewHabit({
          name: "",
          description: "",
          frequency: "daily",
          startDate: "",
          endDate: "",
        });
        setShowForm(false);
      } catch (error) {
        console.error("Error adding/updating habit:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit({ ...newHabit, [name]: value });
  };

  const handleEditHabit = (habit) => {
    setNewHabit(habit);
    setShowForm(true);
    setEditingHabit(habit._id);
  };

  const handleEditProgress = async (habitId, date, completed) => {
    try {
      const response = await axiosInstance.put(`/habit/habits/${habitId}`, {
        date: new Date(date).toISOString().split("T")[0],
        completed,
      });

      setHabits(habits.map(habit => (habit._id === habitId ? response.data.data : habit)));
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await axiosInstance.delete(`/habit/habits/${id}`);
      setHabits(habits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  return (
    <div className={style.habitContainer}>
        <Navbar></Navbar>

        <div className={style.habitList}>
          {habits.map((habit) => (
            <div key={habit._id} className={style.habitCard}>
              <h3>{habit.name}</h3>
              <p>Description: {habit.description}</p>
              <p>Frequency: {habit.frequency}</p>
              <p>
                Start Date:{" "}
                {new Date(habit.startDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                End Date:{" "}
                {new Date(habit.endDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <div>
                <h4>Progress:</h4>
                {habit.progress && habit.progress.length > 0 ? (
                  habit.progress.map((entry, index) => (
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <span>{new Date(entry.date).toLocaleDateString("en-US")}</span>
                      <button
                        className={entry.completed ? style.completeButton : style.incompleteButton}
                        onClick={() => handleEditProgress(habit._id, entry.date, !entry.completed)}
                      >
                        {entry.completed ? "Completed" : "Not Completed"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-info">No progress recorded yet.</p>
                )}
              </div>

              <div style={{ display: "flex", gap: "5px" }}>
                <button className={style.editButton} onClick={() => handleEditHabit(habit)}>
                  <FaEdit /> Edit
                </button>
                <button className={style.deleteButton} onClick={() => handleDeleteHabit(habit._id)}>
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className={style.addHabitButton}
          onClick={() => {
            setShowForm(true);
            setEditingHabit(null);
            setNewHabit({
              name: "",
              description: "",
              frequency: "daily",
              startDate: "",
              endDate: "",
            });
          }}
        >
          Add Habit
        </button>

        {showForm && (
          <div className={style.formContainer}>
            <h2 style={{ color: "#fff" }}>
              {editingHabit ? "Edit Habit" : "Add New Habit"}
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Habit Name"
              value={newHabit.name}
              onChange={handleInputChange}
              className={style.inputField}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newHabit.description}
              onChange={handleInputChange}
              className={style.inputField}
            />

            <select
              name="frequency"
              value={newHabit.frequency}
              onChange={handleInputChange}
              className={style.inputField}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <label style={{ color: "#fff" }}>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={newHabit.startDate}
              onChange={handleInputChange}
              className={style.inputField}
            />

            <label style={{ color: "#fff" }}>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={newHabit.endDate}
              onChange={handleInputChange}
              className={style.inputField}
            />

            <button onClick={handleAddHabit} className={style.submitButton}>
              Submit
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingHabit(null);
              }}
              className={style.cancelButton}
            >
              Cancel
            </button>
          </div>
        )}
    </div>
  );
};

export default HabitsPage;
