"use client";

import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import styles from "@/styles/Categories.module.css";
import { FaApple, FaBeer, FaCar, FaCamera, FaHeart, FaHome } from "react-icons/fa";
import { GrImage } from "react-icons/gr";
import { GoPencil } from "react-icons/go";
import { MdInvertColors } from "react-icons/md";


const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [icons, setIcons] = useState([
      { name: "FaApple", component: <FaApple /> },
      { name: "FaBeer", component: <FaBeer /> },
      { name: "FaCar", component: <FaCar /> },
      { name: "FaCamera", component: <FaCamera /> },
      { name: "FaHeart", component: <FaHeart /> },
      { name: "FaHome", component: <FaHome /> },
     ]);
  const [colors, setColors] = useState([]);
  const [newCategory, setNewCategory] = useState({name: "", description: "", icon: "", color: ""});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, iconsRes, colorsRes] = await Promise.all([
          axiosInstance.get("/category"),
          axiosInstance.get("/category/icons"),
          axiosInstance.get("/category/colors"),
        ]);

        if (Array.isArray(categoriesRes.data)) {
          setCategories(categoriesRes.data);
        } else {
          console.error("Categories response is not an array.");
        }

        // setIcons(iconsRes.data)
        setColors(colorsRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/category", newCategory);
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        setNewCategory({ name: "", description: "", icon: "", color: "" });
        setIsFormVisible(false);
      }
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  return (
    <div className={styles.categoriesPageContainer}>
      <h2 className={styles.heading2}>All Categories</h2>
      <ul className={styles.categoriesList}>
        {categories.length > 0 ? (
          categories.map((cat, idx) => (
            <button
              key={`${cat._id}-${idx}`}
              className={styles.categoryButton}
              style={{ backgroundColor: cat.color }}
            >
              <span className={styles.categorySpan}>{cat.name}</span>
            </button>
          ))
        ) : (
          <li className={styles.categoryItem}>No categories available.</li>
        )}
      </ul>

      <div className={styles.plusIconContainer}>
        <button className={styles.plusIconButton} onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? "Cancel" : "+"}
        </button>
      </div>

      {isFormVisible && (
        <div className={styles.createCategoryForm}>
          <h5 className={styles.createCategoryFormh5}>Create New Custom Category</h5>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.formDiv}>
              <div className={styles.fromDiv1}>
                <label className={styles.createCategoryFormLabel} htmlFor="name">Name</label>
                <input
                  name="name"
                  value={newCategory.name}
                  onChange={handleChange}
                  required
                  className={styles.createCategoryFormInput}
                />
              </div>
              <div className="col-6">
                <label className={styles.createCategoryFormLabel} htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={newCategory.description}
                  onChange={handleChange}
                  className={styles.createCategoryFormTextarea}
                ></textarea>
              </div>

              <div className="col-6">
                <div className={styles.createCategoryFormSelect} 
                  onClick={() => {setShowPicker(!showPicker)}}  
                >Select Icon</div>
              </div>
              <div className="col-6">
                <label className={styles.createCategoryFormLabel} htmlFor="color">Select Color</label>
                <select
                  name="color"
                  value={newCategory.color}
                  onChange={handleChange}
                  className={styles.createCategoryFormSelect}
                >
                  <option value="">Select color</option>
                  {colors.map((color) => (
                    <option key={color._id} value={color.hex}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button type="submit" className={styles.createCategoryFormButton}>Create Category</button>
          </form>
        </div>)
      }
          {/* 
          {
            isFormVisible && (
              <div 
                className={`${styles.modal} ${styles.modalShow}`}
                onClick={() => isFormVisible(false)} 
              >
                <div 
                  className={`${styles.modalContent} ${styles.modalShowContent}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.modalRecurringTasktitleContainer}>
                    <div className={styles.modalRecurringTasktitle}>
                      <div>{newCategory.name}</div>
                    </div>
                    <div>{selectedIcon}</div>
                  </div>

                  <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
                    <div style={{ display: 'flex' }}>
                      <GoPencil className={styles.modalIcon} />
                      <p className={styles.modalOptionText}>Category Name</p>
                    </div>
                  </div>

                  <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
                    <div style={{ display: 'flex' }}>
                      <GrImage  className={styles.modalIcon} />
                      <p className={styles.modalOptionText}>Category icon</p>
                    </div>
                  </div>

                  <div className={`${styles.modalOption} ${styles.modalOptionShow}`}>
                    <div style={{ display: 'flex' }}>
                      <MdInvertColors  className={styles.modalIcon} />
                      <p className={styles.modalOptionText}>Category color</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          } */}
          {showPicker && (
            <div className={styles.iconGrid}>
                {icons.map((icon) => (
                  <div
                    key={icon.name}
                    className={styles.iconItem}
                    onClick={() => {
                    setSelectedIcon(icon.component);
                    // setNewCategory((prev) => ({ ...prev, icon: icon.name }));
                    setShowPicker(false);
                    }}
                  >
                    {icon.component}
                  </div>
                ))}
            </div>
          )}
        </div>

  );
};

export default CategoriesPage;

// // components/SingleIconSelector.js
// "use client";
// import { useState } from "react";
// import { FaApple, FaBeer, FaCar, FaCamera, FaHeart, FaHome } from "react-icons/fa";

// export default function CategoriesPage() {
//   const [selectedIcon, setSelectedIcon] = useState(null);
//   const [showPicker, setShowPicker] = useState(false);
//   const iconList = [
//     { name: "FaApple", component: <FaApple /> },
//     { name: "FaBeer", component: <FaBeer /> },
//     { name: "FaCar", component: <FaCar /> },
//     { name: "FaCamera", component: <FaCamera /> },
//     { name: "FaHeart", component: <FaHeart /> },
//     { name: "FaHome", component: <FaHome /> },
//   ];
//   return (
//     <div>
//       <h3>Select an Icon</h3>

//       {/* Selected Icon */}
//       <div onClick={() => setShowPicker(!showPicker)} >
//         {selectedIcon || "+"}
//       </div>

//       {/* Icon Picker */}
//       {showPicker && (
          // {iconList.map((icon) => (
          //   <div
          //     key={icon.name}
          //     onClick={() => {
          //       setSelectedIcon(icon.component);
          //       setShowPicker(false);
          //     }}
          //   >
          //     {icon.component}
          //   </div>
          // ))}
//         </div>
//       )}
//     </div>
//   );
// }