import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';

// ***** REDUCERS ***** //

export const useFetch = (state, action) => {
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, data: action.payload };
    case 'GET_DENTIST':
      return { ...state, dentist: action.payload };
    default:
      throw new Error();
  }
};

export const useFav = (state, action) => {
  switch (action.type) {
    case 'ADD_FAV':
      return [...state, action.payload];
    case 'DELETE_FAV':
      return state.filter(dentist => dentist.id !== action.payload);
    default:
      throw new Error();
  }
};

export const useTheme = (state, action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return {
        theme: newTheme
      };
    default:
      return state;
  }
};

// ***** CONTEXT AND PROVIDER ***** //

const ContextGlobal = createContext();

const fetch = { data: [], dentist: {} };
const favs = JSON.parse(localStorage.getItem('favs')) || [];
const theme = localStorage.getItem('theme') || 'light';
const initialThemeState = { theme };

export const ContextProvider = ({ children }) => {
  // ***** Fetch Dentist Data From API ***** //
  const [dentistState, dentistDispatch] = useReducer(useFetch, fetch);

  const url = 'https://jsonplaceholder.typicode.com/users';
  useEffect(() => {
    axios(url)
      .then(res => dentistDispatch({ type: 'GET_LIST', payload: res.data }))
      .catch(err => console.log(err));
  }, []);

  // ***** Favs ***** //
  const [favState, favDispatch] = useReducer(useFav, favs);

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favState));
  }, [favState]);

  // ***** Theme ***** //
  const [themeState, themeDispatch] = useReducer(useTheme, initialThemeState);

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

// Hook para consumir el contexto
export const useDentistState = () => useContext(ContextGlobal);
