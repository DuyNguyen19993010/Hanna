// modules
import { useState } from "react";

// components
import SearchBar from "./components/searchBar";

import ItemBox from "./components/itemBox";

import ItemsGrid from "./components/itemsGrid";

// hooks

import useItemsFetch from "../../hooks/useItemsFetch";
import useItemDelete from "../../hooks/useItemDelete";

const Catalog = () => {

    const [page,setPage] = useState(1); 

    const {items} = useItemsFetch(page);

    return (
        <div id = "catalog-wrapper">

            <div id = "util-bar-wrapper">

                <SearchBar/>

                <button id = "add-item-button">Add a new item</button>

            </div>

            <ItemsGrid items = {items}/>

        </div>
    )
}

export default Catalog;