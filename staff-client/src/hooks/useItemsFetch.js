import axios from "axios";
import {useState, useEffect} from "react";

const useItemsFetch = (page) => {
    
    const uri = `${process.env.REACT_APP_ALL_ITEM_PATH}/${page}`;

    const [items, setItem] = useState([]);

    useEffect(()=>{ 
        
        if(page!= null){

            axios.get(uri).then((res)=>{
                    
                setItem(res.data);
            
            }).catch((err)=>{
                
                console.log(err);

            })
        }
        
    },[page]);
    
    return {items};
}

export default useItemsFetch;
