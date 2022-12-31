import styles from "./PrimaryButton.module.css";

const PrimaryButton = ({ title, onClick }) => {
  return (
    <div className={styles.btn} onClick={onClick}>
      {title}
    </div>
  );
};

export default PrimaryButton;
