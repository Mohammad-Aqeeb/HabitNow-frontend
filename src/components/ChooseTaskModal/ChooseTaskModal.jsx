const { FaTrophy, FaSyncAlt, FaCheckCircle } = require("react-icons/fa");
import styles from "@/styles/ChooseTaskModal.module.css";
import { useRouter } from "next/navigation";
function ChooseTaskModal(props){

    const closeModal = props.closeModal;
    const router = useRouter();
    
    const handleTaskNavigation = () => router.push('/task');
    const handleHabitNavigation = () => router.push('/createHabit');
    const handleRecurringNavigation = () => router.push('/recurringTask');
    
    return (
        <div className={`${styles.modal} ${styles.modalShow}`}>
          <div className={`${styles.modalContent} ${styles.modalShowContent}`}>
            <button className={styles.closeBtn} onClick={closeModal}>X</button>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`} onClick={handleHabitNavigation}>
              <div style={{ display: 'flex' }}>
                <FaTrophy className={styles.modalIcon} />
                <p  className={styles.modalOptionText}>Habit</p>
              </div>
              <span className={styles.modalOptionSubtext}>Activity that repeats over time. It has detailed tracking and statistics.</span>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`} onClick={handleRecurringNavigation}>
              <div style={{ display: 'flex' }}>
                <FaSyncAlt className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Recurring Task</p>
              </div>
              <span className={styles.modalOptionSubtext}>Activity that repeats over time without tracking or statistics.</span>
            </div>

            <div className={`${styles.modalOption} ${styles.modalOptionShow}`} onClick={handleTaskNavigation}>
              <div style={{ display: 'flex' }}>
                <FaCheckCircle className={styles.modalIcon} />
                <p className={styles.modalOptionText}>Task</p>
              </div>
              <span className={styles.modalOptionSubtext}>Single instance activity without tracking over time.</span>
            </div>
          </div>
        </div>
    )
}

export default ChooseTaskModal;