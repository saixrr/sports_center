import { Preference,PreferencesActions } from './reducer';
import { API_ENDPOINT } from '../../config/constants';

export const fetchPreferences = async (dispatch:any) => {
  const token= localStorage.getItem("authToken")?? "";
  try {
    dispatch({ type: 'FETCH_PREFERENCES_REQUEST' });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: 'FETCH_PREFERENCES_SUCCESS', payload: data.preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    dispatch({ type: 'FETCH_PREFERENCES_FAILURE', payload: 'Unable to load preferences' });
  }
};

export const updatePreferences = async (dispatch: React.Dispatch<PreferencesActions>, preferences: Preference[]) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      dispatch({ type: 'UPDATE_PREFERENCES_REQUEST' });
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(preferences),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error updating data:', response.status, errorText);
        dispatch({ type: 'UPDATE_PREFERENCES_FAILURE', payload: errorText });
      } else {
        const data = await response.json();
        console.log(data);
        dispatch({ type: 'UPDATE_PREFERENCES_SUCCESS',payload:data });
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      dispatch({ type: 'UPDATE_PREFERENCES_FAILURE', payload: 'Unable to update preferences' });
    }
  };
  