import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";
import ProgressBar from "./ProgressBar";
import styles from "./TimerBox.module.css";
import notif from "../../media/notif.wav";
import { MdFlag, MdPause, MdPlayArrow } from "react-icons/md";
import { useTimer } from "use-timer";
import PrimaryButton from "../UI/PrimaryButton";
import { reportsActions } from "../../store/reportsSlice";

const TimerBox = () => {
  const dispatch = useDispatch();
  const uiSlice = useSelector((state) => state.ui);
  const settingsSlice = useSelector((state) => state.settings);
  const reportsSlice = useSelector((state) => state.reports);

  const notifAudio = useMemo(() => new Audio(notif), []);
  const [activeTab, setActiveTab] = useState(uiSlice.currentTab);
  const [shortBreakCount, setShortBreakCount] = useState(0);
  const today = new Date().toISOString().slice(0, 10);

  const tabs = useMemo(() => {
    return [
      { name: "Pomodoro", time: +settingsSlice.pomodoro * 60 },
      // { name: "Pomodoro", time: 2 },
      // { name: "Short Break", time: 2 },
      { name: "Short Break", time: +settingsSlice.shortBreak * 60 },
      { name: "Long Break", time: +settingsSlice.longBreak * 60 },
      // { name: "Long Break", time: 2 },
    ];
  }, [settingsSlice]);

  const { time, start, pause, reset, status } = useTimer({
    initialTime: uiSlice.curTime,
    endTime: tabs[activeTab].time,
    onTimeOver: () => {
      finishHandler("auto");
    },
    onTimeUpdate: () => {
      dispatch(uiActions.setCurTime(time));
      if (activeTab === 0) {
        if (reportsSlice.lastDate === today) {
          dispatch(reportsActions.addExist({ date: today }));
        } else {
          dispatch(
            reportsActions.addNew({
              date: today,
              time: time,
              id: +new Date() + Math.random(),
            })
          );
        }
      }
    },
  });

  function changeTabHandler(tabNum) {
    if (tabNum !== activeTab) {
      // reset timer
      reset();

      // change tab and save
      setActiveTab(tabNum);
      dispatch(uiActions.changeTab(tabNum));

      // save cur time to 0
      dispatch(uiActions.setCurTime(0));

      // for refresh timer
      start();
      pause();
    }
  }

  function finishHandler(status) {
    if (activeTab === 0) {
      const add = status === "auto" ? 0.5 : 1;
      setShortBreakCount((prev) => prev + add);
    } else if (activeTab === 2) {
      setShortBreakCount(0);
    }

    if (!settingsSlice.muteNotif) {
      notifAudio.play();
    }
    if (shortBreakCount !== settingsSlice.longBreakInterval) {
      changeTabHandler(activeTab === 0 ? 1 : 0);
    } else {
      changeTabHandler(2);
      setShortBreakCount(0);
    }
    if (settingsSlice.autoStart) {
      start();
    }
  }

  const startHandler = () => {
    if (status === "RUNNING") {
      pause();
    } else {
      start();
    }
  };

  const timerNum = new Date((tabs[activeTab].time - time) * 1000)
    .toISOString()
    .slice(14, 19);

  const progress = status === "RUNNING" ? time / tabs[activeTab].time : 0;

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
      <div className={styles["short-break__Box"]}>
        <div className={styles["short-break__title"]}>
          Short Breaks : {shortBreakCount}
        </div>
        <PrimaryButton
          title="Reset"
          onClick={() => setShortBreakCount(0)}
          icon="reset"
        />
      </div>
    </>
  );
};

export default TimerBox;
