"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/services/axiosInstance";
import { useForm } from "@/context/FormContext";
import styles from "@/styles/CategorySelectionPage.module.css";

const CategorySelectionPage = ({ onNext, setValue }) => {
  const { updateFormData } = useForm();
  const [categories, setCategories] = useState([]);

  const handleChange = (categoryId) => {
    setValue(categoryId);
    updateFormData("category", categoryId);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        setCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Select a Category</h2>

      <div className={styles.grid}>
        {categories.map((category) => (
          <button
            key={category._id}
            className={styles.categoryButton}
            style={{ backgroundColor: category.color }}
            onClick={() => {
              handleChange(category._id);
              onNext();
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectionPage;