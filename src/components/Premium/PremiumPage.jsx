import styles from "@/styles/PremiumPage.module.css"
export default function BecomePremiumPage() {
  return (
    <>
    <div className={styles.navbar}>
      <h1 className={styles.heading1}>Become Premium</h1>
    </div>
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.heading2}>Premium Features</h2>
        <ul className={styles.unorderdlist}>
          <li className={styles.listitem}>Track unlimited habits</li>
          <li className={styles.listitem}>Create unlimited recurring tasks</li>
          <li className={styles.listitem}>Create habits and tasks with sub-items / checklists</li>
          <li className={styles.listitem}>Create unlimited custom categories and edit default categories</li>
          <li className={styles.listitem}>Create unlimited filter lists</li>
          <li className={styles.listitem}>Ultra Dark Theme</li>
          <li className={styles.listitem}>Premium accent colors</li>
          <li className={styles.listitem}>Translucent dark to-do list widget</li>
          <li className={styles.listitem}>Mark your progress directly on the list widget</li>
          <li className={styles.listitem}>Interval timer</li>
          <li className={styles.listitem}>CSV data export</li>
          <li className={styles.listitem}>Cloud Backups</li>
          <li className={styles.listitem}>Support HabitNow development</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h2 className={styles.heading2}>HabitNow Free</h2>
        <ul className={styles.unorderdlist}>
          <li className={styles.listitem}>Track up to 7 habits / recurring tasks</li>
          <li className={styles.listitem}>Schedule unlimited tasks</li>
          <li className={styles.listitem}>Create up to 5 custom categories</li>
          <li className={styles.listitem}>Create up to 3 filter lists</li>
          <li className={styles.listitem}>Track habits with daily values</li>
          <li className={styles.listitem}>Notifications and Reminders</li>
          <li className={styles.listitem}>Dark theme</li>
          <li className={styles.listitem}>Customize the app colors</li>
          <li className={styles.listitem}>Backups</li>
          <li className={styles.listitem}>Widgets</li>
          <li className={styles.listitem}>Countdown timer and stopwatch</li>
          <li className={styles.listitem}>Lock PIN</li>
        </ul>
      </div>
      <div className={styles.para}>Unlock the full experience</div>
      <div className={styles.buttonContainer}>
        <button className={styles.btn}>Get Premium</button>
        <p>pay only once Unlock premium forever</p>
      </div>
    </div>
    </>
  );
}