import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Detail = () => {

    const {detailId} = useParams();
    const [character,setCharacter] = useState({}); 

    useEffect(() => {
    fetch(`http://localhost3001/rickandmorty/detail/${detailId}`)
    .then((response) => response.json())
    .then((char) => {
      if (char.name) {
        setCharacter(char);
      } else {
        alert("No hay personajes con ese ID");
      }
    })
    .catch((err) => {
      alert("No hay personajes con ese ID");
    });
  return setCharacter({});
}, [detailId]);

    return(
        <div>
            <button>
                <Link to='/home'> Home </Link>
            </button>
            <h1>{character?.name}</h1>
            <p>{character?.status}</p>
            <p>{character?.species}</p>
            <p>{character?.origin?.name}</p>
            <p>{character?.gender}</p>
            <img src={character?.image} alt="" />
        </div>

    )

}

export default Detail;