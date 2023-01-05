import { MdClose, MdResetTv } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { reportsActions } from "../../store/reportsSlice";
import { uiActions } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import "./Reports.css";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const dispatch = useDispatch();
  const weekData = [
    { date: "Sat", time: 0 },
    { date: "Sun", time: 0 },
    { date: "Mon", time: 0 },
    { date: "Tue", time: 0 },
    { date: "Wen", time: 0 },
    { date: "Thu", time: 0 },
    { date: "Fri", time: 0 },
  ];
  const monthData = [
    { date: "Jan", time: 0 },
    { date: "Feb", time: 0 },
    { date: "Mar", time: 0 },
    { date: "Apr", time: 0 },
    { date: "May", time: 0 },
    { date: "Jun", time: 0 },
    { date: "Jul", time: 0 },
    { date: "Aug", time: 0 },
    { date: "Sep", time: 0 },
    { date: "Oct", time: 0 },
    { date: "Nov", time: 0 },
    { date: "Dec", time: 0 },
  ];

  const periodArr = [
    { name: "weekly", data: weekData, active: true, total: 0 },
    { name: "monthly", data: monthData, active: false, total: 0 },
  ];

  const reportsSlice = useSelector((state) => state.reports);
  const [activeTab, setACtiveTab] = useState(0);

  const closeModalHandler = () => {
    dispatch(uiActions.toggleReport());
  };
  // const resetHandler = () => {
  //   dispatch(reportsActions.reset());
  // };

  const changePeriodHandler = (e) => {
    const targetNum = e.target.dataset.num;
    setACtiveTab(+targetNum);
  };

  reportsSlice.data.forEach((item) => {
    const formattedDate = new Date(item.date);

    const today = new Date();
    const todayWeekDay = today.getDay() + 1;
    const thisSat = +new Date(today.setDate(today.getDate() - todayWeekDay));

    const thisYear = new Date().getFullYear();

    if (+formattedDate >= thisSat) {
      const weekDay = new Date(item.date).getDay() + 1;
      periodArr[0].total = periodArr[0].total + Math.round(item.time / 60);

      weekData[weekDay].time =
        weekData[weekDay].time + Math.round(item.time / 60);
    }

    if (formattedDate.getFullYear() === thisYear) {
      const month = new Date(item.date).getMonth();

      periodArr[1].total = periodArr[1].total + Math.round(item.time / 60);
      monthData[month].time =
        monthData[month].time + Math.round(item.time / 60);
    }
  });

  const weekClass = `${"period-tab"} ${
    activeTab === 0 && "period-tab--active"
  }`;
  const monthClass = `${"period-tab"} ${
    activeTab === 1 && "period-tab--active"
  }`;

  return (
    <Modal closeModal={closeModalHandler}>
      <header className={"reports__header"}>
        <h2>Reports</h2>
        {/* <MdResetTv onClick={resetHandler} /> */}

        <MdClose
          className={"reports__icon--close"}
          onClick={closeModalHandler}
        />
      </header>
      <div className={"reports__period"} onClick={changePeriodHandler}>
        <div className={weekClass} data-num="0">
          Weekly
        </div>
        <div className={monthClass} data-num="1">
          Monthly
        </div>
      </div>
      <div className={"reports__chart-box"}>
        <div className={"reports__total"}>
          Total :{" "}
          <span className={"reports__total-num"}>
            {periodArr[activeTab].total}
          </span>{" "}
          min
        </div>
        <div className={"reports__chart"}>
          <ResponsiveContainer height={300}>
            <BarChart width={500} height={300} data={periodArr[activeTab].data}>
              <XAxis dataKey="date" tickMargin={7} />
              <YAxis unit=" min" />
              <Tooltip />
              {/* <Legend verticalAlign="top" margin={{ top: 10 }} /> */}
              <Bar dataKey="time" fill="#ba4949" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Modal>
  );
};

export default Reports;
