import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import style from "@/styles/Habit.module.css";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { clearError, createHabit, deleteHabit, fetchHabit, setLoading, updateHabit } from "@/slices/habitSlice";
import BottomNavbarPage from "../BottomNavbar/BottomNavbarPage";
import Spinner from "../Spinner/Spinner";

const HabitsPage = () => {
  const dispatch = useDispatch();
  const habits = useSelector((state)=> state.habits.items);
  const loading = useSelector((state)=> state.habits.loading);
  const error = useSelector((state)=> state.habits.error);

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
        await dispatch(fetchHabit()).unwrap();
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    clearError();
    setLoading(false);
    fetchHabits();
  }, []);

  const handleAddHabit = async () => {
    const { name, description, frequency, startDate, endDate } = newHabit;
    if (name.trim()) {
      try {
        if (editingHabit) {
          try{
            await dispatch(updateHabit({id : editingHabit, updatedFields: { complete: true, date: new Date()} })).unwrap();
          }
          catch(error){
            console.log(error.message || "Error while updating");
          }
          setEditingHabit(null);
        } else {
          try{
            await dispatch(createHabit(newHabit)).unwrap();
          }
          catch(error){
            console.log(error.message || "Error while creating habit");
          }
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
      await dispatch(updateHabit({id : habitId, updatedFields : {date: new Date(date).toISOString().split("T")[0], completed}})).unwrap();
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await dispatch(deleteHabit(id)).unwrap();
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  if(loading){
    return <Spinner/>
  }

  if(error){
    return <div>{error}...</div>
  }

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

        <BottomNavbarPage></BottomNavbarPage>

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
