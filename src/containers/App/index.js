/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getOverallData, getDataByCountry, getCountries } from "../../api";
import { Card } from "../../components/Card";
import {
  Main,
  Wrapper,
  CardContainer,
  H1,
  Select,
  Option,
  ErrorMessage
} from "./styled";
import {
  GlobalStyles,
  H2,
  Loading,
  LoadingContainer
} from "../../styles/shared";
import axios from "axios";
import { getTranslatedCountryName } from "../../utils/country";

function App() {
  const [covidData, setOverallData] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedContryData, setSelectedContryData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetchDataByCountry, setIsFetchDataByCountry] = useState(false);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    axios
      .all([getOverallData(), getCountries()])
      .then(
        axios.spread(function(overallData, countriesData) {
          setOverallData(overallData);
          saveFormattedCountries(countriesData.countries);
        })
      )
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsFetchingInitialData(false));
  }

  function saveFormattedCountries(countries) {
    const countriesArray = [];

    for (let country in countries) {
      countriesArray.push({
        countryName: country,
        countryCode: countries[country]
      });
    }
    setCountries(countriesArray);
  }

  function getFormattedData(confirmed, deaths, recovered) {
    return [
      {
        title: "Confirmados",
        value: confirmed.value
      },
      {
        title: "Mortes",
        value: deaths.value
      },
      {
        title: "Recuperados",
        value: recovered.value
      }
    ];
  }

  function renderCards(data) {
    const { confirmed, deaths, recovered } = data;
    const formattedData = getFormattedData(confirmed, deaths, recovered);
    return formattedData.map(elem => (
      <Card key={elem.title} title={elem.title} value={elem.value} />
    ));
  }

  async function handleSelect(evt) {
    if (evt.target.value === "select") {
      return;
    }
    setIsFetchDataByCountry(true);
    const resp = await getDataByCountry(evt.target.value);
    if (resp.error) {
      setErrorMessage(resp.error);
      setIsFetchDataByCountry(false);
      return;
    }
    if (errorMessage) {
      setErrorMessage("");
    }
    setSelectedContryData(resp.data);
    setIsFetchDataByCountry(false);
  }

  const countryOptions = countries.map(country => {
    return (
      <Option
        key={`${country.countryCode}${country.countryName}`}
        value={country.countryCode}
      >
        {getTranslatedCountryName(country.countryName)}
      </Option>
    );
  });

  if (isFetchingInitialData)
    return (
      <>
        <GlobalStyles />
        <LoadingContainer addWidth addHeight>
          <Loading />
        </LoadingContainer>
      </>
    );

  return (
    <>
      <GlobalStyles />
      <Main>
        <Wrapper>
          <H1>Impactos do COVID-19</H1>
          <H2>Dados mundiais</H2>
          <CardContainer>{covidData && renderCards(covidData)}</CardContainer>
          <H2>Dados por país</H2>
          <Select onChange={handleSelect}>
            <Option value="select">Selecione um país</Option>
            {countryOptions}
          </Select>
          {isFetchDataByCountry ? (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          ) : !errorMessage ? (
            <CardContainer>
              {selectedContryData && renderCards(selectedContryData)}
            </CardContainer>
          ) : (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          )}
        </Wrapper>
      </Main>
    </>
  );
}

export default App;
