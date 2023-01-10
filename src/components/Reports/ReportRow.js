import { useState } from "react";
import { MdCheck, MdClose, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { reportsActions } from "../../store/reportsSlice";

const ReportRow = ({ item, onError }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [date, setDate] = useState(item.date);
  const [realTime, setRealTime] = useState(item.realTime);
  const [time, setTime] = useState(
    new Date(item.time * 1000).toISOString().slice(14, 19)
  );

  const dispatch = useDispatch();

  const editHandler = () => {
    setIsEditting((prev) => !prev);
    onError(false);
    setDate(item.date);
    setRealTime(item.realTime);
    setTime(new Date(item.time * 1000).toISOString().slice(14, 19));
  };

  const saveHandler = () => {
    const timeValidation = new RegExp(
      "^(([0]?[0-5][0-9]|[0-9]):([0-5][0-9]))$"
    );

    if (date === "" || !timeValidation.test(time)) {
      onError(true);
      return;
    }

    const convertedTime =
      ((+realTime.slice(0, 2) - 3) * 60 + +realTime.slice(3) - 30) * 60 * 1000;

    const convertedDate = new Date(+new Date(date) + +new Date(convertedTime));

    const convertedFocus = +time.split(":")[0] * 60 + +time.split(":")[1];

    dispatch(
      reportsActions.update({
        date: convertedDate,
        time: convertedFocus,
        id: item.id,
      })
    );

    setIsEditting(false);
  };

  const deleteHandler = () => {
    dispatch(reportsActions.delete({ id: item.id }));
  };

  const dateChangeHandler = (e) => {
    setDate(e.target.value);
    onError(false);
  };
  const realTimeChangeHandler = (e) => {
    setRealTime(e.target.value);
    onError(false);
  };
  const timeChangeHandler = (e) => {
    setTime(e.target.value);
    onError(false);
  };

  const rowClass = `${"table__row"} ${isEditting ? "table__row--target" : ""}`;
  const saveClass = `${"table__data--btn"} ${"table__data--save"}`;
  const cancelClass = `${"table__data--btn"} ${"table__data--cancel"}`;

  const focusTime = new Date(item.time * 1000).toISOString().slice(14, 19);
  return (
    <div className={rowClass}>
      {!isEditting && (
        <>
          <div className={"table__data"}>{item.date}</div>
          <div className={"table__data"}>{item.realTime}</div>
          <div className={"table__data"}>{focusTime}</div>

          <div className={"table__data--actions"}>
            <div onClick={editHandler} className={"table__data--btn"}>
              <MdEdit />
            </div>
            <div onClick={deleteHandler} className={"table__data--btn"}>
              <MdDelete />
            </div>
          </div>
        </>
      )}

      {isEditting && (
        <>
          <input
            className={"table__data--input"}
            type="date"
            value={date}
            onChange={dateChangeHandler}
          />
          <input
            className={"table__data--input"}
            type="time"
            value={realTime}
            onChange={realTimeChangeHandler}
          />
          <input
            className={"table__data--input"}
            type="text"
            value={time}
            onChange={timeChangeHandler}
          />
          <div className={"table__data--actions"}>
            <div className={cancelClass} onClick={editHandler}>
              <MdClose />
            </div>
            <div onClick={saveHandler} className={saveClass}>
              <MdCheck />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportRow;
