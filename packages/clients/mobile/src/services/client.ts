import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.107:3333',
});

export default client;
