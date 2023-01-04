import { MdClose, MdResetTv } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { reportsActions } from "../../store/reportsSlice";
import { uiActions } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import "./Reports.css";

const Reports = () => {
  const dispatch = useDispatch();

  const reportsSlice = useSelector((state) => state.reports);

  const closeModalHandler = () => {
    dispatch(uiActions.toggleReport());
  };
  const resetHandler = () => {
    dispatch(reportsActions.reset());
  };
  return (
    <Modal closeModal={closeModalHandler}>
      <header className={"reports__header"}>
        <h2>Reports</h2>
        <MdResetTv onClick={resetHandler} />

        <MdClose
          className={"reports__icon--close"}
          onClick={closeModalHandler}
        />
      </header>

      {reportsSlice.data.map((item) => {
        return (
          <div key={item.id}>
            {item.date} -{" "}
            {new Date(item.time * 1000).toISOString().slice(11, 19)}
          </div>
        );
      })}
    </Modal>
  );
};

export default Reports;
