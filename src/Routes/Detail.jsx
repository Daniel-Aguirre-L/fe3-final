import React, { useEffect, useState } from 'react';
import { useDentistState } from '../Components/utils/global.context';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const navigate = useNavigate();
  const { dentistState, dentistDispatch } = useDentistState();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const urlDentist = `https://jsonplaceholder.typicode.com/users/${id}`;

  useEffect(() => {
    setLoading(true);
    axios(urlDentist)
      .then(res => {
        dentistDispatch({ type: 'GET_DENTIST', payload: res.data });
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [id, dentistDispatch]);

  const { name, email, phone, website } = dentistState.dentist;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <button className='btn-back' onClick={() => navigate(-1)} aria-label="Go back">
        <img src='/images/back_button.png' alt="Back" className='arrow' />
      </button>

      <div className='contact-card'>
        <h2>{name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Tel:</strong> {phone}</p>
        <p><strong>Web:</strong> {website}</p>
      </div>
    </>
  );
};

export default Detail;