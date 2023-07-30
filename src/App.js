import "./styles.css";
import { Outlet, Link, useNavigate, Route, Routes } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { MuiSelect } from "./components/MuiSelect";
import { Button } from "@mui/material";
import { Graphic } from "./components/Graphic";
import { useState, useEffect } from "react";
import { yeardata, city_area_data, cityData } from "./dataOption/dataOption";
import _ from "lodash";
import LoadingSpinner from "./components/LoadingSpinner";
import Content from "./components/Content";

export default function App() {
  const [yearOption, setYearOption] = useState("");
  const [cityOption, setCityOption] = useState("");
  const [areaOption, setAreaOption] = useState("");

  const years = yeardata;
  const city = cityData;
  const cityArea = city_area_data;
  useEffect(() => {
    setAreaOption("");
  }, [cityOption]);

  const navigate = useNavigate();
  const handleOnClick = () =>
    navigate(`/${yearOption}/${cityOption}/${areaOption}`);

  return (
    <>
      <div className="container">
        <div className="logo">
          <div className="logo_title">High Ball test</div>
          <div className="logo_setting">
            <AiOutlineSetting />
          </div>
        </div>
        <div className="content">
          <div className="taiwan">TAIWAN</div>
          <div className="content_detail">
            <div className="content_detail_title">
              <p>人口、戶數按戶別及性別統計</p>
            </div>
            <div className="content_detail_searchBar">
              <MuiSelect
                label="年分"
                options={years}
                setSelect={setYearOption}
                selectedOption={yearOption}
                width={"100px"}
              />
              <MuiSelect
                label="縣/市"
                options={city}
                setSelect={setCityOption}
                selectedOption={cityOption}
                disabled={!yearOption}
                width={"auto"}
              />
              <MuiSelect
                label="區"
                options={cityArea[cityOption]}
                setSelect={setAreaOption}
                selectedOption={areaOption}
                disabled={!cityOption}
                width={"auto"}
              />
              <Button
                variant="contained"
                onClick={handleOnClick}
                disabled={!areaOption}
                className="Button"
              >
                SUBMIT
              </Button>
            </div>
            <div className="order">
              <span className="line"></span>
              <span className="txt">搜尋結果</span>
              <span className="line"></span>
            </div>
            <Routes>
              <Route
                path="/:yearOption/:cityOption/:areaOption"
                element={<Content />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
