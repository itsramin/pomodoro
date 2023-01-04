import { useSelector } from "react-redux";
import "./App.css";
import MainHeader from "./components/header/MainHeader";
import Reports from "./components/Reports/Reports";
import Settings from "./components/Settings/Settings";
import TimerBox from "./components/Timer/TimerBox";
import "./components/UI/Allcolors.css";

function App() {
  const ui = useSelector((state) => state.ui);

  const appClass = `${"App"} ${ui.currentTab === 1 && "cyan"} ${
    ui.currentTab === 2 && "blue"
  }`;
  return (
    <div className={appClass}>
      <main>
        <MainHeader />
        <TimerBox />
        {ui.reportVisible && <Reports />}
        {ui.settingsVisible && <Settings />}
      </main>
    </div>
  );
}

export default App;
