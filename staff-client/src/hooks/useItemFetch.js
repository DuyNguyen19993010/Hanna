import axios from "axios";
import {useEffect, useState} from "react";

const useItemFetch = (item_id) => {
    
    const [item, setItem] = useState(null);

    const uri = `${process.env.REACT_APP_ITEM_PATH}/${item_id}`;

    useEffect(()=>{

        axios.get(uri).then((res)=>{
                
            setItem(res.data[0]);
        
        }).
        catch((err)=>{

            window.alert('An error has happened');
        
        })
        
    },[item_id]);
    
    return {item};
}

export default useItemFetch;
