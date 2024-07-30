import axios from 'axios';

const baseURL = 'https://restaurants.back.flatheadinteractive.com';

export default axios.create({
  baseURL: baseURL,
});
