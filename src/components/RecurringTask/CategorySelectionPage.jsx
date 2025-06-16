"use client";

import { useEffect } from "react";
import { useForm } from "@/context/FormContext";
import styles from "@/styles/CategorySelectionPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "@/slices/categorySlice";

const CategorySelectionPage = ({ onNext, setValue }) => {
  const { updateFormData } = useForm();
  const dispatch = useDispatch();
  const categories = useSelector((state)=> state.categories.items);

  const handleChange = (categoryId) => {
    setValue(categoryId);
    updateFormData("category", categoryId);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await dispatch(fetchCategory()).unwrap();
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