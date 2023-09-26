import {useState} from "react";
import axios from "axios";

const SearchBar = (props) => {

    const [keyword, setKW] = useState("");

    return(
        <input onChange = {(e)=>{setKW(e.target.value)}} id = "search-bar" placeholder = "Enter to search for an item">
            
        </input>
    )
}

export default SearchBar;