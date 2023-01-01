const Timers = ({
  pomodoro,
  onChangePomodoro,
  shortBreak,
  onChangeShortBreak,
  longBreak,
  onChangeLongBreak,
}) => {
  return (
    <section className={"option__box"}>
      <div className={"option__title"}>Time (min)</div>
      <div className={"option__row"}>
        <div className={"option-control"}>
          <div className={"option__label"}>Pomodoro</div>
          <input
            type="number"
            min={1}
            max={59}
            value={pomodoro}
            onChange={onChangePomodoro}
            className={"option__input--number"}
          />
        </div>
        <div className={"option-control"}>
          <div className={"option__label"}>Short Break</div>
          <input
            type="number"
            min={1}
            max={59}
            value={shortBreak}
            onChange={onChangeShortBreak}
            className={"option__input--number"}
          />
        </div>
        <div className={"option-control"}>
          <div className={"option__label"}>Long Break</div>
          <input
            type="number"
            min={1}
            max={59}
            value={longBreak}
            onChange={onChangeLongBreak}
            className={"option__input--number"}
          />
        </div>
      </div>
    </section>
  );
};

export default Timers;
