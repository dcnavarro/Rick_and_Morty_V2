import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import { addFavorite, deleteFavorite } from "../redux/actions";


function Card({name, gender, species, onClose, image, id}) {

   const dispatch = useDispatch();

   const [isFav, setIsFav] = useState(false);
   
   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         dispatch(deleteFavorite(id));
      }else{
         setIsFav(true);
         dispatch(addFavorite({name, gender, species, onClose, image, id}))
      }
   }

   return (
      <div>
         {isFav ? (
            <button onClick={handleFavorite}>❤️</button>) 
            :(
            <button onClick={handleFavorite}>🤍</button>)
         }
         <br></br>
         <button onClick={onClose}>X</button>
         <Link to={`/detail/${id}`}>
         <h2>{name}</h2>
         </Link>
         <h2>{species}</h2>
         <h2>{gender}</h2>
         <img  src={image} alt={name} />
      </div>
   );
};

export default Card;
