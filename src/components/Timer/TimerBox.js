import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import ProgressBar from "./ProgressBar";
import styles from "./TimerBox.module.css";
import notif from "../../media/notif.wav";
import { MdFlag, MdPause, MdPlayArrow } from "react-icons/md";

const TimerBox = () => {
  const dispatch = useDispatch();
  const uiSlice = useSelector((state) => state.ui);
  const settingsSlice = useSelector((state) => state.settings);

  const notifAudio = useMemo(() => new Audio(notif), []);

  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState(uiSlice.currentTab);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const [timer, setTimer] = useState(60 * 25);

  const tabs = useMemo(() => {
    return [
      { name: "Pomodoro", time: +settingsSlice.pomodoro },
      { name: "Short Break", time: +settingsSlice.shortBreak },
      { name: "Long Break", time: +settingsSlice.longBreak },
    ];
  }, [settingsSlice]);

  useLayoutEffect(() => {
    setTimer(tabs[activeTab].time * 60);
  }, [settingsSlice, tabs, activeTab]);

  const changeTabHandler = useCallback(
    (tabNum) => {
      setActiveTab(tabNum);
      dispatch(uiActions.changeTab(tabNum));
      setRunning(false);
      setTimer(tabs[tabNum].time * 60);
    },
    [tabs, dispatch]
  );

  const finishHandler = useCallback(() => {
    setRunning(false);
    setShortBreakCount((prev) => prev + 1);
    if (!settingsSlice.muteNotif) {
      notifAudio.play();
    }

    if (shortBreakCount !== settingsSlice.longBreakInterval) {
      changeTabHandler(1);
    } else {
      changeTabHandler(2);
      setShortBreakCount(0);
    }
    if (settingsSlice.autoStart) {
      setRunning(true);
    }
  }, [shortBreakCount, settingsSlice, notifAudio, changeTabHandler]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (timer === 0) {
      clearInterval(interval);
      finishHandler();
    }
    return () => clearInterval(interval);
  }, [running, timer, finishHandler]);

  const startHandler = () => {
    setRunning((prev) => !prev);
  };

  const timerNum = new Date(timer * 1000).toISOString().slice(14, 19);

  const progress = running
    ? (tabs[activeTab].time * 60 - timer) / (tabs[activeTab].time * 60)
    : 0;

  return (
    <>
      <ProgressBar percentage={progress} />
      <div className={styles.timerBox}>
        <div className={styles.timerTabs}>
          {tabs.map((tab, i) => {
            return (
              <div
                className={`${styles.tab} ${
                  activeTab === i && styles["tab--active"]
                }`}
                onClick={changeTabHandler.bind(null, i)}
                key={tab.name}
              >
                {tab.name}
              </div>
            );
          })}
        </div>
        <div className={styles.timer}>{timerNum}</div>
        <div className={styles.buttons}>
          <div className={styles["btn"]} onClick={startHandler}>
            {running ? <MdPause /> : <MdPlayArrow />}
            {running ? "Pause" : "Start"}
          </div>
          {running && (
            <div className={styles["btn"]} onClick={finishHandler}>
              <MdFlag /> Finish
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TimerBox;
