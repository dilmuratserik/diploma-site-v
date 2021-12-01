import axios from "axios";
import Config from "../../baseURL.json";

const BACK_URL = Config.api;
const  headers =  {
  Authorization: `Token ${localStorage.getItem("token")}`,
}

let http = {};

async function post_method(url, data) {
  const response = await axios.post(BACK_URL + url, data, { headers: headers });
  return response;
}

async function get_method(url, params) {
  console.log();
  const response = await axios.get(BACK_URL + url, {params: params, headers: headers}, );
  return response;
}

http.post = post_method;
http.get = get_method;

export default http;
