import axios from 'axios';
import config from '../config';

const axiosInstance = process.env.REACT_APP_ENV === 'development'
  ? axios.create()
  : axios.create({ baseURL: config.apiUrl });

export default axiosInstance;
