import axios from "axios";
import Config from "../../baseURL.json";

const BACK_URL = Config.api;

let http = {};

async function post_method(url, data) {
  const response = await axios.post(BACK_URL + url, data,);
  return response;
}

async function put_method(url, data) {
  const response = await axios.put(BACK_URL + url, data);
  return response;
}

async function get_method(url, params) {
  const response = await axios.get(BACK_URL + url, {params: params} );
  return response;
}

async function delete_method(url) {
  const response = await axios.delete(BACK_URL + url, { headers: headers });
  return response;
}

http.post = post_method;
http.get = get_method;
http.put = put_method;
http.delete = delete_method;

export default http;
