import "./App.css";
import MainScreen from "./components/MainScreen";
import SingleChat from "./components/SingleChat";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import avatar from '../src/images/avatar.png';



function App() {
  const [mockData, setMockData] = useState([]);
  const [chatUpdated, setChatUpdated] = useState();

  const dataHandler = (chat) => {
    setChatUpdated(chat);
  };

  const baseUrl = "http://localhost:3000/mess/";

  useEffect(async () => {
    const res = await axios.get(baseUrl);
    if (res.data) {
      setMockData(res.data);
    }
  }, [chatUpdated]);

	const getTimeFromDate = (timestamp) => {
		const pad = (num) => ("0" + num).slice(-2);
		const date = new Date(timestamp * 1000);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const hrs = hours > 12 ? hours - 12 : hours;
		const ampm = hours >= 12 ? "PM" : "AM";
		return pad(hrs) + ":" + pad(minutes) + " " + ampm;
};

const commonProps = {
	mockData,
	getTimeFromDate,
	avatar
}

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<MainScreen commonProps={commonProps} />} />
          <Route
            exact
            path="/:order"
            element={<SingleChat dataHandler={dataHandler} baseUrl={baseUrl} commonProps={commonProps}/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
