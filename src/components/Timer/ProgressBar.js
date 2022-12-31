import styles from "./ProgressBar.module.css";

const ProgressBar = ({ percentage }) => {
  return (
    <div className={styles.outer}>
      <div
        className={styles.inner}
        style={{ width: percentage * 100 + "%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;
