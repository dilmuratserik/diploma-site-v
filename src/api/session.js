import axios from "axios";
import http from "./http"
import Config from "../../baseURL.json"
const BACK_URL = Config.api

let session = {};

// Login
function login(data) {
  return axios.post(`${BACK_URL}/users/login/`, data)
}

// Agents
function getAgents() {
  return http.get('/users/tp/')
}


session.login = login
session.getAgents = getAgents

export default session;