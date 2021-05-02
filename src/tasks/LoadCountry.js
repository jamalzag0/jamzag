import { features } from "../resources/data/countries.json";
import { sortCountries, setColorCountry } from "./CommonUtils";

class LoadCountriesTask {
  mapCountries = features;
  setState = null;

  load = async (setState) => {
    this.setState = setState;
    const url = "https://disease.sh/v3/covid-19/countries";
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.#processCovidData(data);
      });

    const sortedCountries = sortCountries(this.mapCountries);
    this.setState(sortedCountries);
  };

  #processCovidData = (worldCountries) => {
    for (let i = 0; i < this.mapCountries.length; i++) {
      const mapCountry = this.mapCountries[i];

      const worldCountry = worldCountries.find(
        (worldCountry) =>
          worldCountry.countryInfo.iso3 === mapCountry.properties.ISO_A3
      );

      mapCountry.properties.cases = 0;
      mapCountry.properties.fillColor = "";
      mapCountry.properties.flag = "";
      mapCountry.properties.deaths = 0;
      mapCountry.properties.population = 0;
      mapCountry.properties.active = 0;

      if (worldCountry != null) {
        mapCountry.properties.cases = worldCountry.cases;
        mapCountry.properties.flag = worldCountry.countryInfo.flag;
        mapCountry.properties.recovered = worldCountry.recovered;
        mapCountry.properties.deaths = worldCountry.deaths;
        mapCountry.properties.population = worldCountry.population;
        mapCountry.properties.active = worldCountry.active;
      }

      setColorCountry(mapCountry);
    }
    this.setState(this.mapCountries);
  };
}

export default LoadCountriesTask;
