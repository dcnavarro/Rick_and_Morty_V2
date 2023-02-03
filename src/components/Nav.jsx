import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";


const Nav = ({onSearch}) => {
    return(
        <nav>
            <Link to='about'>About</Link>
            <br></br>
            <Link to='home'>Home</Link>
            <br></br>
            <Link to='/'>Logout</Link>
            <br></br>
            <div></div>
        <SearchBar onSearch={onSearch} />
        </nav>
    )
};

export default Nav;