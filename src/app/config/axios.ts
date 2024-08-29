import axios from 'axios';

export const baseURL = 'http://10.90.2.205:3333';

export default axios.create({
  baseURL: baseURL,
});
