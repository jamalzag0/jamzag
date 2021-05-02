import React from "react";
import { formatNumber } from "../tasks/CommonUtils";
import "../styles/MapStyles.css";

function CovidPopup({ covidSelectedValues }) {
  return (
    <div className="covid19-stat-container">
      <div className="covid19-stat-name">{covidSelectedValues.country}</div>
      <div
        className="covid19-stat-flag"
        style={{ backgroundImage: `url(${covidSelectedValues.flag})` }}
      ></div>
      <div className="covid19-stat-population">
        Population: {formatNumber(covidSelectedValues.population)}
      </div>
      <div className="covid19-stat-vaccinated">
        Vaccinated: {formatNumber(covidSelectedValues.vaccinated)}
      </div>
      <div className="covid19-stat-confirmed">
        Cases: {formatNumber(covidSelectedValues.cases)}
      </div>
      <div className="covid19-stat-recovered">
        Recovered: {formatNumber(covidSelectedValues.recovered)}
      </div>
      <div className="covid19-stat-deaths">
        Deaths: {formatNumber(covidSelectedValues.deaths)}
      </div>
    </div>
  );
}

export default CovidPopup;
