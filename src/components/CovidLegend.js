import React from "react";
import { Card } from "react-bootstrap";
import { formatNumber } from "../tasks/CommonUtils";

function CovidLegend({ covidSelectedValues }) {
  return (
    <Card bg="success" border="danger" text="white">
      <h3>{covidSelectedValues.country}</h3>
      <Card.Img src={covidSelectedValues.flag} />
      <Card.Body>
        <Card.Text as="h5">
          Population: {formatNumber(covidSelectedValues.population)}
          <br />
          Active: {formatNumber(covidSelectedValues.active)}
          <br />
          Cases: {formatNumber(covidSelectedValues.cases)}
          <br />
          Recovered: {formatNumber(covidSelectedValues.recovered)}
          <br />
          Deaths: {formatNumber(covidSelectedValues.deaths)}
          <br />
          Vaccinated: {formatNumber(covidSelectedValues.vaccinated)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CovidLegend;
