import React from "react";
import { MapContainer, GeoJSON, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/MapStyles.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { formatNumber } from "../tasks/CommonUtils";
import CovidPopup from "../components/CovidPopup";

const CovidMap = ({ countries, selectedValues }) => {
  // Each Country
  const onEachCountry = (country, layer) => {
    layer.options.color = country.properties.color;
    layer.options.fillColor = country.properties.fillColor;
    layer.options.fillOpacity = 1;
    layer.options.weight = 1;
    const countryName = country.properties.ADMIN;
    layer.bindPopup(
      `<b>${countryName}</b><br />
      <img src=${country.properties.flag} width="120px" height="80px" /><br />
    Population: ${formatNumber(country.properties.population)}<br />
    Cases: ${formatNumber(country.properties.cases)}<br />
    Recovered: ${formatNumber(country.properties.recovered)}<br />
    Deaths: ${formatNumber(country.properties.deaths)}`
    );
  };

  return (
    <MapContainer
      className="MapStyle"
      zoom={2}
      center={[25, 50]}
      scrollWheelZoom={false}
    >
      <GeoJSON
        className="CountryStyle"
        data={countries}
        onEachFeature={onEachCountry}
      ></GeoJSON>

      <Marker
        position={[selectedValues.lat, selectedValues.lng]}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [20, 30],
            iconAnchor: [12, 41],
            popupAnchor: [0, -35],
          })
        }
      >
        <Popup>
          <CovidPopup covidSelectedValues={selectedValues}></CovidPopup>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CovidMap;
