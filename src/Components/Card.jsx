import React from "react";
import { Link } from 'react-router-dom';
import { useDentistState } from './utils/global.context';

const Card = ({ id, name, username }) => {
  const { favState, favDispatch } = useDentistState();
  const isFavorited = favState.some(dentist => dentist.id === id);

  const toggleFav = (e) => {
    e.preventDefault();
    if (isFavorited) {
      favDispatch({ type: 'DELETE_FAV', payload: id });
    } else {
      favDispatch({ type: 'ADD_FAV', payload: { id, name, username } });
    }
  };

  return (
    <div className="card">
      <div>
        <Link style={{ textDecoration: 'none' }} to={`/dentist/${id}`}>
          <div>
            <img src="images/doctor.jpg" alt="dentist" />
          </div>
          <div className="card-data">
            <p className="user">{username}</p>
            <h5 className="name">{name}</h5>
            <p className="info">Ver información</p>
          </div>
        </Link>
        <div 
          onClick={toggleFav} 
          className="btn-fav" 
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorited ? 
            <img className='heart' src='images/heart_fav.png' alt='heart' /> : 
            <img className='heart' src='images/heart.png' alt='heart' />
          }
        </div>
      </div>
    </div>
  );
};

export default Card;