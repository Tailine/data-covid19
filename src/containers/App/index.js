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
  ErrorMessage,
  Table,
  TableRowData
} from "./styled";
import {
  GlobalStyles,
  H2,
  Loading,
  LoadingContainer
} from "../../styles/shared";
import axios from "axios";
import { getTranslatedCountryName } from "../../utils/country";
import { Paragraph } from "../../styles/shared";

function App() {
  const [covidData, setOverallData] = useState();
  const [countries, setCountries] = useState([]);
  const [selectedContryData, setSelectedContryData] = useState();
  const [brazilData, setBrazilData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetchDataByCountry, setIsFetchDataByCountry] = useState(false);
  const [isFetchingInitialData, setIsFetchingInitialData] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  async function fetchBrazilData() {
    axios.get("https://covid19-brazil-api.now.sh/api/report/v1/").then(d => {
      setBrazilData(d.data.data);
      console.log(d.data.data);
    });
  }

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
        countryName: countries[country].name,
        countryCode: countries[country].iso2
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
    const selectValue = evt.target.value;

    if (selectValue === "select") {
      return;
    }
    setIsFetchDataByCountry(true);
    const resp = await getDataByCountry(evt.target.value);

    if (brazilData.length && selectValue !== "BR") setBrazilData([]);
    if (selectValue === "BR") fetchBrazilData();

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

  function getFormatedDate(lastUpdate) {
    const date = new Date(lastUpdate);
    return Intl.DateTimeFormat("pt-br").format(date);
  }

  function renderCountryData() {
    if (isFetchDataByCountry) {
      return (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      );
    }

    if (errorMessage) {
      return <ErrorMessage>{errorMessage}</ErrorMessage>;
    }

    return (
      <>
        <CardContainer>
          {selectedContryData && renderCards(selectedContryData)}
        </CardContainer>
        {!!brazilData.length && (
          <Table>
            <TableRowData>Estado</TableRowData>
            <TableRowData>Casos</TableRowData>
            <TableRowData>Mortes</TableRowData>
            {brazilData.map(d => (
              <>
                <TableRowData>{d.uf}</TableRowData>
                <TableRowData>{d.cases}</TableRowData>
                <TableRowData>{d.deaths}</TableRowData>
              </>
            ))}
          </Table>
        )}
      </>
    );
  }

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
          {covidData && (
            <Paragraph>
              Última atualização: {`${getFormatedDate(covidData.lastUpdate)}`}
            </Paragraph>
          )}
          <CardContainer>{covidData && renderCards(covidData)}</CardContainer>
          <H2>Dados por país</H2>
          <Select onChange={handleSelect}>
            <Option value="select">Selecione um país</Option>
            {countryOptions}
          </Select>
          {selectedContryData && (
            <Paragraph>
              Última atualização:{" "}
              {`${getFormatedDate(selectedContryData.lastUpdate)}`}
            </Paragraph>
          )}
          {renderCountryData()}
        </Wrapper>
      </Main>
    </>
  );
}

export default App;
