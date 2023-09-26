import { useEffect, useState } from "react";
import useItemDelete from "../../../hooks/useItemDelete";

const DeleteBtn = (props) => {

    const [flag,setFlag] = useState(false);

    const {status} = useItemDelete(flag, props.item.id);

    useEffect(()=>{
        
        if(status){

            props.setFlag(true);
        
        }

    },[status])

    return (
        
        <button onClick={()=> setFlag(true)}>X</button> 
    
    )
}

export default DeleteBtn;