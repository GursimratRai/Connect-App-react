const API_ROOT = 'http://localhost:8000/api/v1';

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchPosts: () => `${API_ROOT}/posts`,
  editProfile: () => `${API_ROOT}/users/edit`,
  userProfile: (userId) => `${API_ROOT}/users/profile/${userId}`,
  userFriends: () => `${API_ROOT}/friendship/friends`,
  addFriend: (userId) => `${API_ROOT}/friendship/add_friend?id=${userId}`,
  removeFriend: (userId) => `${API_ROOT}/friendship/remove_friend?id=${userId}`,
  createPost : () => `${API_ROOT}/posts/create`,
  createComment : () => `${API_ROOT}/comments/create`,
  toggleLike : (id,likeType) => `${API_ROOT}/likes/toggle?id=${id}&type=${likeType}`,
  userSearch : (searchText) => `${API_ROOT}/users/searchText?text=${searchText}`
};
