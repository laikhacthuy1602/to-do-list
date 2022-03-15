import API from '../common';

const resource = '/auth';

export default {
  login(url, data) {
    return API.post(
      `${resource + url}`,
      data,
    );
  },
  register(url, data) {
    return API.post(
      `${resource + url}`,
      data,
    );
  },
  getUser(url) {
    return API.get(
      `${resource + url}`,
      {
        headers: { 'Access-Control-Allow-Origin': '*', withCredentials: true },
      },
    );
  },
};
