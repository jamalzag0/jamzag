import React from "react";

const CovidPieChartZones = () => {
  return (
    <div className="covid19_box">
      <div id="zone4" className="legend_box">
        Vaccinated
      </div>
      <div id="zone3" className="legend_box">
        Deaths
      </div>
      <div id="zone2" className="legend_box">
        Recovered
      </div>
      <div id="zone1" className="legend_box">
        Cases
      </div>
    </div>
  );
};

export default CovidPieChartZones;
