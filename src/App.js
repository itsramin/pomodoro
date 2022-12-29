import { useState } from "react";
import "./App.css";
import MainHeader from "./components/header/MainHeader";
import TimerBox from "./components/Timer/TimerBox";
import "./components/UI/Allcolors.css";

function App() {
  const [tab, setTab] = useState(0);
  const changeTabHandler = (num) => {
    setTab(num);
  };

  const appClass = `${"App"} ${tab === 1 && "cyan"} ${tab === 2 && "blue"}`;
  return (
    <div className={appClass}>
      <main>
        <MainHeader />
        <TimerBox onChangeTab={changeTabHandler} />
      </main>
    </div>
  );
}

export default App;
