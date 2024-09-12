import React from 'react';
import { Link } from 'react-router-dom';
import { useDentistState } from './utils/global.context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  const { themeState, themeDispatch } = useDentistState();

  const toggleTheme = () => {
    themeDispatch({ type: 'CHANGE_THEME' });
  };

  return (
    <nav className={themeState.theme === 'dark' ? 'navbar-dark' : 'navbar-light'}>
      <div className='logo-container'>
        <img className='logo-icon' src="public/DH.ico" alt="DH Odonto icon" />
        <span className='logo-text'>DH ODONTO</span>
      </div>

      <div className='nav-container'>
        <div className='nav-bar'>
          <Link to="/home">Inicio</Link>
          <Link to="/favs">Favoritos</Link>
          <Link to="/contact">Contacto</Link>
        </div>

        <button 
          className='btn-change-theme' 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
        >
          <FontAwesomeIcon 
            icon={themeState.theme === 'dark' ? faSun : faMoon} // Muestra el sol para modo oscuro y la luna para modo claro
            className='icon-change-theme' 
            aria-hidden="true" 
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;