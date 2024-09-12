import React from "react";
import Card from "../Components/Card";
import { useDentistState } from '../Components/utils/global.context';

const Favs = () => {
  const { favState } = useDentistState();

  return (
    <>
      <h1>Dentistas Favoritos</h1>
      <p className="subtitle">Tus Dentistas Favoritos en un Solo Lugar</p>
      <div className="card-grid">
        {favState.length > 0 ? (
          favState.map(dentist => (
            <Card 
              key={dentist.id}
              id={dentist.id}
              name={dentist.name}
              username={dentist.username}
            />
          ))
        ) : (
          <p>No has agregado ningún dentista a favoritos.</p>
        )}
      </div>
    </>
  );
};

export default Favs;