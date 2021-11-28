import axios from "axios";
import Config from "../../baseURL.json"
const BACK_URL = Config.api

let session = {};


function login(data) {
  return axios.post(`${BACK_URL}/users/login/`, data)
}

session.login = login


export default session;