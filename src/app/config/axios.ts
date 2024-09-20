import axios from 'axios';

export const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL);
export default axios.create({
  baseURL: baseURL,
});
