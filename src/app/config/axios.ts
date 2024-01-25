import axios from 'axios';

const baseURL = 'https://log.flatheadinteractive.com';

export default axios.create({
  baseURL: baseURL,
});
