export const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'GET_LIST':
        return { ...state, data: action.payload };
      case 'GET_DENTIST':
        return { ...state, dentist: action.payload };
      default:
        return state; 
    }
  };
  

  export const favReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_FAV':
        return [...state, action.payload];
      case 'DELETE_FAV':
        return state.filter(dentist => dentist.id !== action.payload);
      default:
        return state; 
    }
  };
  

  export const themeReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_THEME':
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        return { theme: newTheme }; 
      default:
        return state;
    }
  };