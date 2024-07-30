import axios from 'axios';

const baseURL = 'http://10.90.1.118:3333';

export default axios.create({
  baseURL: baseURL,
});
