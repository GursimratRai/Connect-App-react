import { APIUrls } from "../helpers/urls";
import {getAuthTokenFromLocalStorage} from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS } from "./actionTypes";

export function fetchUserFriends(userId) {
    return (dispatch) => {
        const url = APIUrls.userFriends(userId);
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : `Bearer ${getAuthTokenFromLocalStorage()}`
            },
          })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('fetch friends', data.data.friends);
            if (data.success) {
                dispatch(fetchFriendsSuccess(data.data.friends));
                return;
            }
            // dispatch(userFriendsFailed(data.message));
        });
    }
}

export function fetchFriendsSuccess(friends) {
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends
    };
}