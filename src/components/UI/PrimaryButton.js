import styles from "./PrimaryButton.module.css";
import { MdBarChart, MdReplay, MdSave, MdSettings } from "react-icons/md";
const PrimaryButton = ({
  title,
  onClick,
  icon,
  resize = false,
  bgColor = undefined,
  textColor = undefined,
}) => {
  const btnClass = `${styles.btn} ${resize && styles.resize}`;
  return (
    <div
      className={btnClass}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {icon === "settings" && <MdSettings className={styles.icon} />}
      {icon === "reset" && <MdReplay className={styles.icon} />}
      {icon === "save" && <MdSave className={styles.icon} />}
      {icon === "reports" && <MdBarChart className={styles.icon} />}
      <div className={styles["title"]}>{title}</div>
    </div>
  );
};

export default PrimaryButton;
