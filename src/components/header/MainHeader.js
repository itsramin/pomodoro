import { MdAccessTimeFilled } from "react-icons/md";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import PrimaryButton from "../UI/PrimaryButton";
import styles from "./MainHeader.module.css";

const MainHeader = () => {
  const dispatch = useDispatch();

  const settingsHandler = () => {
    dispatch(uiActions.toggleSettings());
  };
  const reportHandler = () => {
    dispatch(uiActions.toggleReport());
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <MdAccessTimeFilled className={styles.icon} />
        Pomodoro
      </div>
      <div className={styles.nav}>
        <PrimaryButton
          title="Reports"
          onClick={reportHandler}
          icon="reports"
          resize={true}
        />
        <PrimaryButton
          title="Settings"
          onClick={settingsHandler}
          icon="settings"
          resize={true}
        />
      </div>
    </header>
  );
};

export default MainHeader;
