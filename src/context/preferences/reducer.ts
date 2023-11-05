export type Preference = {
    id: number;
    sports: string[];
  };
  
  export interface PreferencesState {
    preferences: Preference[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
  
  export const initialPreferencesState: PreferencesState = {
    preferences: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
  };
  
  export type PreferencesActions =
    | { type: "FETCH_PREFERENCES_REQUEST" }
    | { type: "FETCH_PREFERENCES_SUCCESS"; payload: Preference[] }
    | { type: "FETCH_PREFERENCES_FAILURE"; payload: string }
    | { type: "UPDATE_PREFERENCES_REQUEST" }
    | { type: "UPDATE_PREFERENCES_SUCCESS";payload:Preference[] }
    | { type: "UPDATE_PREFERENCES_FAILURE"; payload: string };
  
  export const preferencesReducer = (state: PreferencesState = initialPreferencesState, action: PreferencesActions): PreferencesState => {
    switch (action.type) {
      case "FETCH_PREFERENCES_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
      case "FETCH_PREFERENCES_SUCCESS":
        return {
          ...state,
          isLoading: false,
          preferences: action.payload,
        };
      case "FETCH_PREFERENCES_FAILURE":
        return {
          ...state,
          isLoading: false,
          isError: true,
          errorMessage: action.payload,
        };
      case "UPDATE_PREFERENCES_REQUEST":
        // You can add the update logic here if needed
        return {
          ...state,
        };
      case "UPDATE_PREFERENCES_SUCCESS":
        // You can add the success update logic here if needed
        return {
          ...state,
          isLoading: false,
          preferences:action.payload
        };
      case "UPDATE_PREFERENCES_FAILURE":
        // You can add the update failure logic here if needed
        return {
          ...state,
          isError: true,
          errorMessage: action.payload,
        };
      default:
        return state;
    }
  };
  