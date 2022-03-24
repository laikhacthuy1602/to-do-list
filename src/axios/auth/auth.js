import API from '../common';

const resource = '/auth';
// const resource2 = '';

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
      `${url}`,
      {
        headers: {
          withCredentials: true,
        },
      },
    );
  },
};
