import { useEffect } from "react";
import styles from "../../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUser } from "@/slices/userSlice";

function ProfilePage() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const loading = useSelector((state) => state.user.loading);
  
  const profilePicture = `https://dummyimage.com/150x150/ffffff/000000.png&text=Profile`

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUser({ ...profile, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(updateUser({ ...profile, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  useEffect(() => {
    try{
      dispatch(fetchUser());
    }
    catch(error){
      alert("Error getting profile: ");
      console.log(err?.message || "Something went wrong.");
    }
  }, [dispatch]);

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileHeading}>Edit Profile</h1>
      <div className={styles.profilePictureContainer}>
        <img
          src={profile.profilePicture || profilePicture }
          alt="Profile"
          className={styles.profilePicture}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className={styles.fileInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Name</label>
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleInputChange}
          className={styles.profileInput}
        />
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
          className={styles.profileInput}
        />
      </div>
      <button className={styles.saveButton} onClick={handleSave}>
         {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

export default ProfilePage;