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
import { dateFormat } from "../../helper/helper";

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
  const reportsSlice = useSelector((state) => state.reports);
  const detailData = reportsSlice.data.map((item, i) => {
    return {
      date: dateFormat(item.date),
      time: item.time,
      realTime: new Date(item.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      id: i,
    };
  });

  const periodArr = [
    { name: "weekly", data: weekData, total: 0 },
    { name: "monthly", data: monthData, total: 0 },
    { name: "detail", data: detailData, total: 0 },
  ];

  const [activeTab, setACtiveTab] = useState(0);

  const closeModalHandler = () => {
    dispatch(uiActions.toggleReport());
  };
  const resetHandler = () => {
    dispatch(reportsActions.resetToday());
  };

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

    periodArr[2].total = periodArr[2].total + Math.round(item.time / 60);

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
  const detailClass = `${"period-tab"} ${
    activeTab === 2 && "period-tab--active"
  }`;

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
      <div className={"reports__cards"}>
        <div className={"reports__card"}>
          <div className={"card__title"}>Total (min)</div>
          <div className={"card__value"}>{periodArr[activeTab].total}</div>
        </div>
        <div className={"reports__card"}>
          <div className={"card__title"}>Streak day</div>
          <div className={"card__value"}>{reportsSlice.streak}</div>
        </div>
      </div>

      <div className={"reports__chart-box"}>
        <div className={"reports__period"} onClick={changePeriodHandler}>
          <div className={weekClass} data-num="0">
            Weekly
          </div>
          <div className={monthClass} data-num="1">
            Monthly
          </div>
          <div className={detailClass} data-num="2">
            Detailed
          </div>
        </div>
        <div className={"reports__chart"}>
          {activeTab !== 2 && (
            <ResponsiveContainer height={250}>
              <BarChart
                width={500}
                height={250}
                data={periodArr[activeTab].data}
              >
                <XAxis dataKey="date" tickMargin={7} />
                <YAxis unit=" min" />
                <Tooltip />

                <Bar dataKey="time" fill="#ba4949" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {activeTab === 2 && (
            <div className={"reports__table"}>
              <div className={"table__header"}>
                <div className={"header__col"}>Date</div>
                <div className={"header__col"}>Time</div>
                <div className={"header__col"}>Focus (min)</div>
              </div>
              <div className={"table__datas"}>
                {detailData.map((item) => {
                  return (
                    <div className={"table__row"} key={item.id}>
                      <div className={"table__data"}>{item.date}</div>
                      <div className={"table__data"}>{item.realTime}</div>
                      <div className={"table__data"}>
                        {new Date((item.time - 1) * 1000)
                          .toISOString()
                          .slice(14, 19)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Reports;
