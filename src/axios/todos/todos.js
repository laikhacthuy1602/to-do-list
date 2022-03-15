import API from '../common';

const resource = '/auth';

export default {
  getAll(url, data) {
    return API.post(
      `${resource + url}`,
      data,
      {
        headers: `Bearer ${localStorage.getItem('token')}`,
      },
    );
  },
};
