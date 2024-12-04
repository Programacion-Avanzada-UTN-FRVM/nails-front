import axios from "axios";

import { API_URL } from "./App.config.js";

export const axiosClient = axios.create({
  baseURL: API_URL,
});
