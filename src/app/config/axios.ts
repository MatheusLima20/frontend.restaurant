import axios from 'axios';

export const baseURL = 'https://restaurants.back.flatheadinteractive.com';

export default axios.create({
  baseURL: baseURL,
});
