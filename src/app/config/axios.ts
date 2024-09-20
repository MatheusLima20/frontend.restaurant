import axios from 'axios';

export const baseURL = import.meta.env.VITE_BASE_URL;
console.log(baseURL, ' baseURL');
export default axios.create({
  baseURL: baseURL,
});
