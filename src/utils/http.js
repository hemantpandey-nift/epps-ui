import axios from "axios";
import CONSTANTS from "../constants/constants";

const http = axios.create({
  baseURL: `${CONSTANTS.APP_API_URL}/`,
});

export default http;
