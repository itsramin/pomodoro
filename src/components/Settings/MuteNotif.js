const MuteNotif = ({ onChange, isTrue }) => {
  return (
    <section className="option__box">
      <span className="option__row">
        <div className="option__title">Mute Notification Sound</div>
        <label className="input__switch">
          <input type="checkbox" onChange={onChange} checked={isTrue} />
          <span className="input__switch--slider input__switch--round"></span>
        </label>
      </span>
    </section>
  );
};

export default MuteNotif;
