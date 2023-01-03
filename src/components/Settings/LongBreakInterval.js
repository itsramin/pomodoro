const LongBreakInterval = ({ longBreakInterval, onChange }) => {
  return (
    <section className={"option__box"}>
      <div className={"option__row"}>
        <div className={"option__title"}>Long Break interval</div>
        <input
          type="number"
          min={1}
          value={longBreakInterval}
          onChange={onChange}
          className={"option__input--number"}
        />
      </div>
    </section>
  );
};

export default LongBreakInterval;
