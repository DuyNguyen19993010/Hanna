import { useState, useEffect } from "react";
import axios from "axios";

const useItemDelete = (trigger,item_id) => {
    
    const [status, setStatus] = useState(false);
    
    const uri = `${process.env.REACT_APP_DELETE_ITEM_PATH}/${item_id}`;

    useEffect(()=>{

        if(trigger){
            
            axios.delete(uri).then((res)=>{

                setStatus(true);
                
            }).
            catch((err)=>{
    
                console.log(err);
    
            })    

        }


    }, [trigger])

    return {status};

}

export default useItemDelete;