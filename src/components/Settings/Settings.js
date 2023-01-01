import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settingSlice";
import { uiActions } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import styles from "./Settings.module.css";

const Settings = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);

  const [pomodoro, setPomodoro] = useState(settingsState.pomodoro);
  const [shortBreak, setShortBreak] = useState(settingsState.shortBreak);
  const [longBreak, setLongBreak] = useState(settingsState.longBreak);
  const [longBreakInterval, setLongBreakInterval] = useState(
    settingsState.longBreakInterval
  );

  const closeModalHandler = () => {
    dispatch(uiActions.toggleSettings());
  };
  const pomodoroChangeHandler = (e) => {
    setPomodoro(e.target.value);
  };
  const sBreakChangeHandler = (e) => {
    setShortBreak(e.target.value);
  };
  const lBreakChangeHandler = (e) => {
    setLongBreak(e.target.value);
  };
  const longBreakIntervalChangeHandler = (e) => {
    setLongBreakInterval(e.target.value);
  };

  const saveHandler = () => {
    if (pomodoro < 1 || pomodoro > 59) {
      return;
    }
    dispatch(
      settingsActions.change({
        pomodoro,
        shortBreak,
        longBreak,
        longBreakInterval,
      })
    );
    closeModalHandler();
  };
  return (
    <Modal closeModal={closeModalHandler}>
      <header className={styles["header"]}>
        <h2>Settings</h2>
        <MdClose className={styles["iconClose"]} onClick={closeModalHandler} />
      </header>

      <section className={styles["optionBox"]}>
        <div className={styles["title"]}>Time (min)</div>
        <div className={styles["row"]}>
          <div className={styles["option-control"]}>
            <div className={styles["label"]}>Pomodoro</div>
            <input
              type="number"
              min={1}
              max={59}
              value={pomodoro}
              onChange={pomodoroChangeHandler}
              className={styles["input"]}
            />
          </div>
          <div className={styles["option-control"]}>
            <div className={styles["label"]}>Short Break</div>
            <input
              type="number"
              min={1}
              max={59}
              value={shortBreak}
              onChange={sBreakChangeHandler}
              className={styles["input"]}
            />
          </div>
          <div className={styles["option-control"]}>
            <div className={styles["label"]}>Long Break</div>
            <input
              type="number"
              min={1}
              max={59}
              value={longBreak}
              onChange={lBreakChangeHandler}
              className={styles["input"]}
            />
          </div>
        </div>
      </section>

      <section className={styles["optionBox"]}>
        <div className={styles["row"]}>
          <div className={styles["title"]}>Long Break interval</div>
          <input
            type="number"
            min={1}
            max={99}
            value={longBreakInterval}
            onChange={longBreakIntervalChangeHandler}
            className={styles["input"]}
          />
        </div>
      </section>
      <section className={styles["optionBox"]}></section>
      <div className={styles["buttons"]}>
        <div className={styles["saveBtn"]} onClick={saveHandler}>
          Save
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
