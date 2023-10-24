import { API_ENDPOINT } from '../../config/constants';

export const fetchNewMatches = async ( dispatch:any) => {
    const token = localStorage.getItem("authToken") ?? "";
    try{
        dispatch({type:"FETCH_MATCHES_REQUEST"});
        const response = await fetch(`${API_ENDPOINT}/matches`, {
            method: 'GET',
        headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        console.log(data);
        dispatch({type:"FETCH_MATCHES_SUCCESS",payload:data})
    } catch (error) {
      console.log('Error fetching news MATCHES:', error);
      dispatch({type:"FETCH_MATCHES_FAILURE",payload:'Unable to load matches'})
    }
}