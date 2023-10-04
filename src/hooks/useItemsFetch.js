import axios from "axios";
import {useState, useEffect, useContext} from "react";

// context

import { PendingContext } from "../context/PendingContext";
const useItemsFetch = (page) => {
    
    const uri = `${process.env.REACT_APP_ALL_ITEM_PATH}/${page}`;
    
    const [items, setItems] = useState([]);
    
    const {setPending} = useContext(PendingContext)

    useEffect(()=>{ 

        if(page!= null){
            
            setPending(true);

            axios.get(uri).then((res)=>{
                console.log('data');
                setItems(res.data);
            
            }).catch((err)=>{
                console.log(err);
                window.alert(err);

            }).finally(()=>{
                console.log('done fetching');
                setPending(false);
            
            })
        }
        
    },[page,setPending,uri]);

    const setNewItems = (new_set) => {

        setItems(new_set);

    }


    
    return {items,setNewItems};
}

export default useItemsFetch;
