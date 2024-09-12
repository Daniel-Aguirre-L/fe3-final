import { Routes, Route } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Home from "./Routes/Home";
import Favs from "./Routes/Favs";
import Detail from "./Routes/Detail";
import Contact from "./Routes/Contact";
import './index.css';
import { useDentistState } from './Components/utils/global.context'
import { useEffect } from 'react';

function App() {

  const { themeState } = useDentistState();

  useEffect(() => {
    if (localStorage.getItem('theme') == null){
      localStorage.setItem('theme', 'light')
    }
  }, [])

  return (
      <div className={`App ${themeState.theme}`}>
          <Navbar/>
          <Routes>
          <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/favs' element={<Favs/>} />
            <Route path='/dentist/:id' element={<Detail/>} />
            <Route path='/contact' element={<Contact/>} />
          </Routes> 
          <Footer/>
      </div>
  );
}

export default App;