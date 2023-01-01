import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settingSlice";
import { uiActions } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import AutoStart from "./AutoStartBreak";
import LongBreakInterval from "./LongBreakInterval";
import "./Settings.css";
import Timers from "./Timers";

const Settings = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state) => state.settings);

  const [pomodoro, setPomodoro] = useState(settingsState.pomodoro);
  const [shortBreak, setShortBreak] = useState(settingsState.shortBreak);
  const [longBreak, setLongBreak] = useState(settingsState.longBreak);
  const [longBreakInterval, setLongBreakInterval] = useState(
    settingsState.longBreakInterval
  );

  const [autoStart, setAutoStart] = useState(settingsState.autoStart);

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
  const autoStartChangeHandler = () => {
    setAutoStart((prev) => !prev);
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
        autoStart,
      })
    );
    closeModalHandler();
  };
  return (
    <Modal closeModal={closeModalHandler}>
      <header className={"settings__header"}>
        <h2>Settings</h2>
        <MdClose
          className={"settings__icon--close"}
          onClick={closeModalHandler}
        />
      </header>

      <Timers
        pomodoro={pomodoro}
        onChangePomodoro={pomodoroChangeHandler}
        shortBreak={shortBreak}
        longBreak={longBreak}
        onChangeShortBreak={sBreakChangeHandler}
        onChangeLongBreak={lBreakChangeHandler}
      />

      <LongBreakInterval
        onChange={longBreakIntervalChangeHandler}
        longBreakInterval={longBreakInterval}
      />
      <AutoStart onChange={autoStartChangeHandler} isTrue={autoStart} />

      <div className={"settings__buttons"}>
        <div className={"settings__button--save"} onClick={saveHandler}>
          Save
        </div>
      </div>
    </Modal>
  );
};

export default Settings;
