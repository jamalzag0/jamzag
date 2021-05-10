import React, { useState, useEffect } from "react";
import CovidLoading from "./CovidLoading";
import CovidMap from "./CovidMap";
import CovidLegend from "./CovidLegend";
import LoadCountriesTask from "../tasks/LoadCountry";
import { getCentroid, processCovidVaccineData } from "../tasks/CommonUtils";
import CovidZones from "./CovidZones";
import CovidPieChart from "./CovidPieChart";
import Worldflags from "../resources/images/Worldflags.png";

const Covid19 = () => {
  const [countries, setCountries] = useState([]);
  const [chartData, setChartData] = useState([{}]);
  const [selectedValues, setSelectedValues] = useState({
    country: "",
    vaccinated: 0,
    recovered: 0,
    cases: 0,
    deaths: 0,
    population: 0,
    active: 0,
    flag: "",
    lng: 9999,
    lat: 9999,
  });

  const load = () => {
    const loadCountriesTask = new LoadCountriesTask();
    loadCountriesTask.load(setCountries);
  };

  const loadAllCountries = async () => {
    const url = "https://disease.sh/v3/covid-19/all";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const vacUrl =
          "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=1";
        fetch(vacUrl)
          .then((response) => response.json())
          .then((vacData) => {
            setSelectedValues({
              country: "The World",
              flag: Worldflags,
              recovered: data.recovered,
              deaths: data.deaths,
              cases: data.cases,
              active: data.active,
              population: data.population,
              vaccinated: processCovidVaccineData(vacData),
              lng: 9999,
              lat: 9999,
            });

            setChartData([
              { name: "Cases", value: data.cases },
              { name: "Recovered", value: data.recovered },
              { name: "Deaths", value: data.deaths },
              { name: "Vaccinated", value: processCovidVaccineData(vacData) },
            ]);
          });
      });
  };

  useEffect(() => {
    loadAllCountries();
  }, []);

  var numbers;
  const handleCountryChange = async (e) => {
    const countryName = e.target.value;

    if (countryName === "The World") {
      loadAllCountries();
    } else {
      const country = countries.find(
        (country) => country.properties.ADMIN === countryName
      );

      if (country != null) {
        if (country.geometry.type === "MultiPolygon") {
          numbers = getCentroid(country.geometry.coordinates[0][0]);
        } else {
          numbers = getCentroid(country.geometry.coordinates[0]);
        }

        const url = `https://disease.sh/v3/covid-19/vaccine/coverage/countries/${country.properties.ISO_A3}?lastdays=1`;
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setSelectedValues({
              country: countryName,
              flag: country.properties.flag,
              recovered: country.properties.recovered,
              deaths: country.properties.deaths,
              population: country.properties.population,
              cases: country.properties.cases,
              active: country.properties.active,
              vaccinated: processCovidVaccineData(data),
              lng: numbers[0],
              lat: numbers[1],
            });
            setChartData([
              { name: "Cases", value: country.properties.cases },
              { name: "Recovered", value: country.properties.recovered },
              { name: "Deaths", value: country.properties.deaths },
              { name: "Vaccinated", value: processCovidVaccineData(data) },
            ]);
          });
      }
    }
  };

  useEffect(load, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="covid19-header">
          <h3>World Wide COVID-19 & Vaccination Status</h3>
        </div>
      </div>

      <div className="row">
        <div className="covid19_contries">
          <select className="btn btn-primary" onChange={handleCountryChange}>
            <option value="The World">The World</option>
            {countries.map((country) => (
              <option
                key={country.properties.ADMIN}
                value={country.properties.ADMIN}
              >
                {country.properties.ADMIN}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3">
          <CovidLegend covidSelectedValues={selectedValues}></CovidLegend>
        </div>

        <div className="col-lg-9">
          <h6>Click on any country on the map below for more details...</h6>
          <CovidZones />
          {countries.length === 0 ? (
            <CovidLoading />
          ) : (
            <CovidMap countries={countries} selectedValues={selectedValues} />
          )}
        </div>
      </div>

      <div className="row">
        {selectedValues.population === 0 ? (
          <div />
        ) : (
          <CovidPieChart covidChartData={chartData}></CovidPieChart>
        )}
      </div>
    </div>
  );
};

export default Covid19;
