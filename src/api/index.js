import axios from "axios";

const backendURL = process.env.REACT_APP_BACKEND_URL;
const weatherURL = process.env.REACT_APP_WEATHER_URL;
const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

const auth = {
  signIn: (data) => axios.post(`${backendURL}/auth/signin`, data),
  signUp: (data) => axios.post(`${backendURL}/auth/signup`, data),
};

const user = {
  profile: (data, token) => axios.post(`${backendURL}/user/profile`, data, { headers: { authorization: token } }),
  password: (data, token) => axios.post(`${backendURL}/user/password`, data, { headers: { authorization: token } }),
};

const location = {
  getByPosition: (params) =>
    axios.get(`${weatherURL}/locations/v1/cities/geoposition/search`, {
      params: {
        apikey: weatherAPIKey,
        q: `${params.lat},${params.long}`,
      },
    }),
};

const weather = {
  currentCond: (params) =>
    axios.get(`${weatherURL}/currentconditions/v1/${params.key}`, {
      params: {
        apikey: weatherAPIKey,
        details: true,
      },
    }),
};

export default {
  auth,
  user,
  location,
  weather,
};
