import './App.css';
import Cards from './components/Cards.jsx';
import Nav from "./components/Nav";
import About from './components/About';
import Detail from './components/Detail';
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Form from './Form/Form';
import Favorites from './components/Favorites/Favorites';

function App () {
  const location = useLocation(); 
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  const username = 'dnavarro@mail.com';
  const password = 'PaltaJJ';
  const login = (userData) =>{
    if(userData.username === username && userData.password === password){
      setAccess(true);  
      navigate("/home");
    }
  }

  useEffect(() => {
    !access && navigate('/')
  }, [access])
  
  const onSearch = (character)=>{
     fetch (`http://localhost:3001/rickandmorty/onsearch/${character}`)
      .then((response) => response.json())
      .then((data) => {
         if (data.id) {
            setCharacters((oldChars) => [...oldChars, data])
         } else {
            alert("No hay personajes con ese ID")
  }})
  .catch(err => console.log(err))
  }
  
  const onClose = (id) =>{
    setCharacters(
      characters.filter(character=>character.id !== id)
    )
  }

  return (
    <div className='App' style={{ padding: '25px' }}>
      {location.pathname === "/" ? <Form login = {login}/> : <Nav onSearch={onSearch}/>}
        <Routes>
        <Route path='/home' element={<Cards onClose={onClose} characters={characters} />} />
        <Route path ='/about' element={<About />} />
        <Route path = '/detail/:detailId' element={<Detail />} />
        <Route path = '/favorites' element={<Favorites />} />
      </Routes>
     </div>
  )
}

export default App;
