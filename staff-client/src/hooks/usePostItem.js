import axios from "axios";
import { useEffect, useState } from "react"

export const usePostItem = (data) => {

    const [status,setStatus] = useState(null);
    
    const uri = process.env.REACT_APP_POST_ITEM_PATH;

    useEffect(()=>{

        if(data){

            console.log([...data]);

            axios.post('http://localhost:5000/api/catalog/item_add', data,{
                headers: { "Content-Type": "multipart/form-data" }
            }).
            then((res)=>{
                 
                    console.log(res.data);
                
                }).catch((err) => {
                    
                    window.alert(err);

                }

            )
        }

    },
    [data])

    return [status];

}