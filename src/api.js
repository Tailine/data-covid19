import axios from "axios";

const mainUrl = "https://covid19.mathdro.id/api";
const countryDataUrl = "https://covid19.mathdro.id/api/countries/";
const countriesUrl = "https://covid19.mathdro.id/api/countries";
const brazilUrl = "https://covid19-brazil-api.now.sh/api/report/v1/";

function getResponseObject() {
  return {
    data: null,
    error: null
  };
}

export async function getOverallData() {
  const resp = await axios.get(mainUrl);
  return resp.data;
}

export async function getDataByCountry(countryCode) {
  const respObj = getResponseObject();
  try {
    const resp = await axios.get(`${countryDataUrl}${countryCode}`);
    return { ...respObj, data: resp.data };
  } catch (error) {
    return { ...respObj, error: "Sem dados para o país selelecinado." };
  }
}

export async function getCountries() {
  const resp = await axios.get(countriesUrl);
  return resp.data;
}

export async function getBrazilStats() {
  try {
    const resp = await axios.get(brazilUrl);
    return resp.data.data;
  } catch (err) {
    console.error(err);
  }
}
