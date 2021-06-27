import { APIUrls } from '../helpers/urls';
import {UPDATE_POSTS} from './actionTypes';

export function fetchPosts() {
  return (dispatch) => {
    //Connect-APP backend API.
    const url = APIUrls.fetchPosts();
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
