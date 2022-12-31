import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ProgressBar from "./ProgressBar";
import styles from "./TimerBox.module.css";

const TimerBox = ({ onChangeTab }) => {
  const [timer, setTimer] = useState(0.1 * 60);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const settingsSlice = useSelector((state) => state.settings);

  const tabs = useMemo(() => {
    return [
      { name: "Pomodoro", time: +settingsSlice.pomodoro },
      { name: "Short Break", time: +settingsSlice.shortBreak },
      { name: "Long Break", time: +settingsSlice.longBreak },
    ];
  }, [settingsSlice]);

  const changeTabHandler = useCallback(
    (tabNum) => {
      setActiveTab(tabNum);
      onChangeTab(tabNum);
      setRunning(false);
      setTimer(tabs[tabNum].time * 60);
    },
    [onChangeTab, tabs]
  );

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
      setRunning(false);
      setShortBreakCount((prev) => prev + 1);

      if (shortBreakCount !== 3) {
        changeTabHandler(1);
      } else {
        changeTabHandler(2);
        setShortBreakCount(0);
      }
    }
    return () => clearInterval(interval);
  }, [running, timer, shortBreakCount, changeTabHandler]);

  const startHandler = () => {
    setRunning((prev) => !prev);
  };

  const timerNum = new Date(timer * 1000).toISOString().slice(14, 19);
  const progress =
    (tabs[activeTab].time * 60 - timer) / (tabs[activeTab].time * 60);

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
        <div className={styles.timerBtn} onClick={startHandler}>
          {running ? "Stop" : "Start"}
        </div>
      </div>
    </>
  );
};

export default TimerBox;
