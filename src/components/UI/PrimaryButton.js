import styles from "./PrimaryButton.module.css";
import { MdReplay, MdSave, MdSettings } from "react-icons/md";
const PrimaryButton = ({
  title,
  onClick,
  icon,
  bgColor = undefined,
  textColor = undefined,
}) => {
  return (
    <div
      className={styles.btn}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {icon === "settings" && <MdSettings className={styles.icon} />}
      {icon === "reset" && <MdReplay className={styles.icon} />}
      {icon === "save" && <MdSave className={styles.icon} />}
      <div className={styles["title"]}>{title}</div>
    </div>
  );
};

export default PrimaryButton;
