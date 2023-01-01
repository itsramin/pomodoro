const AutoStart = ({ onChange, isTrue }) => {
  return (
    <section className="option__box">
      <span className="option__row">
        <div className="option__title">Auto start Breaks</div>
        <label className="input__switch">
          <input type="checkbox" onChange={onChange} checked={isTrue} />
          <span className="input__switch--slider input__switch--round"></span>
        </label>
      </span>
    </section>
  );
};

export default AutoStart;
