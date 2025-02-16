import axios from "axios";

const fetchData = async (method, url, userInputs, token = null) => {
  try {
    const axiosOptions = {
      method: method,
      url: url,
      data: userInputs,
      headers: {},
    };

    if (token) {
      axiosOptions.headers.Authorization = `Bearer ${token}`;
      axiosOptions.withCredentials = true;
    }

    return await axios(axiosOptions);
  } catch (err) {
    throw err;
  }
};

export default fetchData;
