const API_ROOT = 'http://localhost:8000/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: () => `${API_ROOT}/posts`,
};
