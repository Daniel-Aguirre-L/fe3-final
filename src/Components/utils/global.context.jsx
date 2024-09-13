import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import { fetchReducer, favReducer, themeReducer } from '../../reducers/reducer'; 

const ContextGlobal = createContext();

const initialFetchState = { data: [], dentist: {} };
const initialFavState = JSON.parse(localStorage.getItem('favs')) || [];
const initialThemeState = { theme: localStorage.getItem('theme') || 'light' };

export const ContextProvider = ({ children }) => {

  const [dentistState, dentistDispatch] = useReducer(fetchReducer, initialFetchState);
  const [favState, favDispatch] = useReducer(favReducer, initialFavState);
  const [themeState, themeDispatch] = useReducer(themeReducer, initialThemeState);

  // Fetch dentists data
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axios('https://jsonplaceholder.typicode.com/users');
        dentistDispatch({ type: 'GET_LIST', payload: response.data });
      } catch (error) {
        console.error('Error fetching dentists:', error);
      }
    };
    fetchDentists();
  }, []);

  // Save favs to localStorage
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favState));
  }, [favState]);

  // Save theme to localStorage 
  useEffect(() => {
    localStorage.setItem('theme', themeState.theme);
  }, [themeState.theme]);

  return (
    <ContextGlobal.Provider value={{
      dentistState, dentistDispatch,
      favState, favDispatch,
      themeState, themeDispatch
    }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useDentistState = () => useContext(ContextGlobal);