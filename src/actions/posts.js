import {UPDATE_POSTS} from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    const url = 'http://localhost:8000/api/v1/posts';
    fetch(url)
      .then((response) => {
        // console.log('response',response.json());
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        dispatch(updatePosts(data.posts));
      });
  };
}

export function updatePosts(posts) {
    return {
        type:UPDATE_POSTS,
        posts
    }
}
