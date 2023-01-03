import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import ProgressBar from "./ProgressBar";
import styles from "./TimerBox.module.css";
import notif from "../../media/notif.wav";
import { MdFlag, MdPause, MdPlayArrow } from "react-icons/md";
import { useTimer } from "use-timer";

const TimerBox = () => {
  const dispatch = useDispatch();
  const uiSlice = useSelector((state) => state.ui);
  const settingsSlice = useSelector((state) => state.settings);

  const notifAudio = useMemo(() => new Audio(notif), []);
  const [activeTab, setActiveTab] = useState(uiSlice.currentTab);
  const [shortBreakCount, setShortBreakCount] = useState(0);

  const tabs = useMemo(() => {
    return [
      { name: "Pomodoro", time: +settingsSlice.pomodoro },
      { name: "Short Break", time: 0.1 },
      // { name: "Short Break", time: +settingsSlice.shortBreak },
      { name: "Long Break", time: +settingsSlice.longBreak },
    ];
  }, [settingsSlice]);

  const { time, start, pause, reset, status } = useTimer({
    // initialTime: uiSlice.curTime ? uiSlice.curTime : 0,
    // onTimeUpdate: () => {
    //   dispatch(uiActions.setCurTime(time));
    // },
  });

  const changeTabHandler = useCallback(
    (tabNum) => {
      if (tabNum !== activeTab) {
        reset();
        // dispatch(uiActions.setCurTime(0));

        setActiveTab(tabNum);
        dispatch(uiActions.changeTab(tabNum));
      }
    },
    [activeTab, dispatch, reset]
  );

  const finishHandler = useCallback(() => {
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
      start();
    }
  }, [shortBreakCount, settingsSlice, notifAudio, changeTabHandler, start]);

  useEffect(() => {
    if (tabs[activeTab].time * 60 - time < 1) {
      finishHandler();
    }
  }, [time, tabs, activeTab, finishHandler]);

  const startHandler = () => {
    if (status === "RUNNING") {
      pause();
    } else {
      start();
    }
  };

  const timerNum = new Date((tabs[activeTab].time * 60 - time) * 1000)
    .toISOString()
    .slice(14, 19);

  const progress =
    status === "RUNNING" ? time / (tabs[activeTab].time * 60) : 0;

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
            {status === "RUNNING" ? <MdPause /> : <MdPlayArrow />}
            {status === "RUNNING" ? "Pause" : "Start"}
          </div>
          {status === "RUNNING" && activeTab === 0 && (
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
