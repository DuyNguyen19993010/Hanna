// modules
import { useContext, useState } from "react";

// components
import SearchBar from "./components/searchBar";

import ItemBox from "./components/itemBox";

import {ItemsGridMemo} from "./components/itemsGrid";

import SearchBarWrapper from "./components/SearchBarWrapper";

// hooks

import useItemsFetch from "../../hooks/useItemsFetch";

import { ItemContext } from "./context/ItemContext";

import { NavContext } from "../../context/NavContext";

// style

import '../../assets/ui/css/app.css';

const CatalogWrapper = ({children}) => {
    
    return (
    
        <div className = "page" id = "catalog-wrapper">

            {children}
        
        </div>
    )

}

const Catalog = () => {

    const [page,setPage] = useState(1); 

    // fetch items to display

    const {items,setNewItems} = useItemsFetch(page);

    // store info of selected items

    const [item,setItem] = useState(null);
    
    const [setToggle] = useContext(NavContext);

    return (
        <CatalogWrapper>
                
            <SearchBarWrapper>
        
                <button id = "add-item-button"><i className="fa-solid fa-cake-candles" style={{"color": "#ffffff"}}></i></button>

                <SearchBar/>
                
                <i id = "menu-toggle" onClick={()=>{setToggle(true);}} class="fa-solid fa-bars fa-xl" style={{"color": "#000000"}}></i>

            </SearchBarWrapper>

            <ItemContext.Provider value = {[item,setItem,items,setNewItems]}>

                <ItemsGridMemo items = {items}/>

                <ItemBox/>

            </ItemContext.Provider>
        
        </CatalogWrapper>
    )
}

export default Catalog;