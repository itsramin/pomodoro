import { useDispatch } from "react-redux";
import { settingsActions } from "../../store/settingSlice";
import PrimaryButton from "../UI/PrimaryButton";

const ResetDefault = ({ onClose }) => {
  const dispatch = useDispatch();

  const resetHandler = () => {
    dispatch(settingsActions.resetDefaults());
    onClose();
  };
  return (
    <section className={"option__box"}>
      <div className={"option__row"}>
        <div className={"option__title"}>Reset to Default</div>
        <PrimaryButton
          title="Reset"
          bgColor="var(--color-red-1)"
          onClick={resetHandler}
        />
      </div>
    </section>
  );
};

export default ResetDefault;
