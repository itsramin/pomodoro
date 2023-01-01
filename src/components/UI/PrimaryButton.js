import styles from "./PrimaryButton.module.css";
import { MdSettings } from "react-icons/md";
const PrimaryButton = ({ title, onClick, icon }) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      {icon === "settings" && <MdSettings className={styles.icon} />}
      <div className={styles["title"]}>{title}</div>
    </div>
  );
};

export default PrimaryButton;