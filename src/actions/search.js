import { FETCH_SEARCH_RESULTS_SUCCESS } from "./actionTypes";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { APIUrls } from "../helpers/urls";

export function searchUsers(searchText) {
    return (dispatch) => {
        const url = APIUrls.userSearch(searchText);
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
              console.log('search data',data);
            if (data.success) {
                dispatch(searchResultsSuccess(data.data.users));
            }else{
                dispatch(searchResultsSuccess(data.message));
            }
          });
      };
}

export function searchResultsSuccess(users) {
    return {
        type:FETCH_SEARCH_RESULTS_SUCCESS,
        users,
    }
}