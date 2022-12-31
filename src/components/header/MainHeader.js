import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import PrimaryButton from "../UI/PrimaryButton";
import styles from "./MainHeader.module.css";

const MainHeader = () => {
  const dispatch = useDispatch();

  const settingsHandler = () => {
    dispatch(uiActions.toggleSettings());
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Pomodoro</div>
      <div className={styles.nav}>
        <PrimaryButton
          title="Settings"
          onClick={settingsHandler}
          icon="settings"
        />
      </div>
    </header>
  );
};

export default MainHeader;
