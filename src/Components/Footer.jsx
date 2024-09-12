import React from 'react';


const Footer = () => {
  return (
    <footer>
      <div className='footer-logo-container'>
        <img src='images/DH.png' alt='Logo de DH Clínica Dental' className='footer-logo' />
      </div>
      <div className='redes-container'>
        <img className='redes-img' src='images/ico-whatsapp.png' alt="whatsapp" />
        <img className='redes-img' src='images/ico-facebook.png' alt="facebook" />
        <img className='redes-img' src='images/ico-instagram.png' alt="instagram" />
        <img className='redes-img' src='images/ico-tiktok.png' alt="tiktok" />
      </div>
    </footer>
  );
};

export default Footer;