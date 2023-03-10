import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { settingsActions } from "../../store/settingSlice";
import { uiActions } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import PrimaryButton from "../UI/PrimaryButton";
import AutoStart from "./AutoStartBreak";
import LongBreakInterval from "./LongBreakInterval";
import MuteNotif from "./MuteNotif";
import ResetDefault from "./ResetDefault";
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
  const [muteNotif, setMuteNotif] = useState(settingsState.muteNotif);
  const [error, setError] = useState(false);

  const closeModalHandler = () => {
    dispatch(uiActions.toggleSettings());
  };
  const pomodoroChangeHandler = (e) => {
    setError(false);
    setPomodoro(e.target.value);
  };
  const sBreakChangeHandler = (e) => {
    setError(false);
    setShortBreak(e.target.value);
  };
  const lBreakChangeHandler = (e) => {
    setError(false);
    setLongBreak(e.target.value);
  };
  const longBreakIntervalChangeHandler = (e) => {
    setError(false);
    setLongBreakInterval(e.target.value);
  };
  const autoStartChangeHandler = () => {
    setAutoStart((prev) => !prev);
  };
  const muteNotifChangeHandler = () => {
    setMuteNotif((prev) => !prev);
  };

  const saveHandler = () => {
    if (longBreakInterval < 1) {
      return setError("Long Break Intervalmust be a number greater than 1.");
    }
    if (
      pomodoro < 1 ||
      pomodoro > 59 ||
      shortBreak < 1 ||
      shortBreak > 59 ||
      longBreak < 1 ||
      longBreak > 59
    ) {
      return setError("Times must be a number between 1 and 59.");
    }
    dispatch(
      settingsActions.change({
        pomodoro,
        shortBreak,
        longBreak,
        longBreakInterval,
        autoStart,
        muteNotif,
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

      <div className={"settings__options"}>
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
        <MuteNotif onChange={muteNotifChangeHandler} isTrue={muteNotif} />
        <ResetDefault onClose={closeModalHandler} />
      </div>

      <div className={"settings__buttons"}>
        {error && <div className={"settings__error"}>{error}</div>}

        <PrimaryButton
          title="Save"
          onClick={saveHandler}
          bgColor="var(--color-grey-3)"
          icon="save"
        />
      </div>
    </Modal>
  );
};

export default Settings;
