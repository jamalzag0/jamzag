export const sortCountries = (data) => {
  const sortedCountries = [...data];

  sortedCountries.sort((a, b) => {
    if (a.properties.ADMIN < b.properties.ADMIN) {
      return -1;
    } else {
      return 1;
    }
  });

  return sortedCountries;
};

export const getCentroid = function (data) {
  return data.reduce(
    function (x, y) {
      return [x[0] + y[0] / data.length, x[1] + y[1] / data.length];
    },
    [0, 0]
  );
};

export const processCovidVaccineData = (data) => {
  let vaccinated = 0;
  for (const n in data.timeline) {
    vaccinated = data.timeline[n];
    break;
  }
  if (vaccinated === 0) {
    for (const n in data) {
      vaccinated = data[n];
      break;
    }
  }
  return vaccinated;
};

export const formatNumber = (number) => {
  try {
    const formattedString = number.toString();
    return formattedString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (err) {
    //console.log(err);
    // if not avaiable set to 0
    return 0;
  }
};

export const setColorCountry = (country) => {
  country.properties.color = "black";

  if (country.properties.cases >= 1000000) country.properties.fillColor = "red";
  else if (
    country.properties.cases >= 500000 &&
    country.properties.cases < 1000000
  )
    country.properties.fillColor = "gray";
  else if (
    country.properties.cases >= 200000 &&
    country.properties.cases < 500000
  )
    country.properties.fillColor = "orange";
  else if (
    country.properties.cases >= 50000 &&
    country.properties.cases < 200000
  )
    country.properties.fillColor = "yellow";
  else if (country.properties.cases > 0 && country.properties.cases < 50000)
    country.properties.fillColor = "green";
  else country.properties.fillColor = "pink";

  return country;
};
