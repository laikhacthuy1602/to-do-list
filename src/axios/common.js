import axios from 'axios';

const baseURL = 'http://todolist.test/api/';

export default axios.create({
  baseURL,
});
