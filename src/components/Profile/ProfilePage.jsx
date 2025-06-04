import { useState } from "react";
import styles from "../../styles/Profile.module.css";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    profilePicture: `https://dummyimage.com/150x150/ffffff/000000.png&text=Profile`
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileHeading}>Edit Profile</h1>
      <div className={styles.profilePictureContainer}>
        <img
          src={profile.profilePicture}
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
          name="name"
          value={profile.name}
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
        Save Changes
      </button>
    </div>
  );
}

export default ProfilePage;