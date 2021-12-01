import axios from "axios";
import Config from "../../baseURL.json";

const BACK_URL = Config.api;
const config = {
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
};

let http = {};

async function post_method(url, data) {
  const response = await axios.post(BACK_URL + url, data, config);
  return response;
}

async function get_method(url) {
  const response = await axios.get(BACK_URL + url, config);
  return response;
}

http.post = post_method;
http.get = get_method;

export default http;
