import { useState } from "react";
import useItemFetch from "../../../hooks/useItemFetch";

import DeleteBtn from "./deleteBtn";

const Item = (props) => {

    // delete item flag
    const [flag,setFlag] = useState(false);

    return(

        !flag? (

            <div className = "item" id = {`item-${props.item.id}`}>
                        
                <button onClick={()=>{console.log(props.item)}}>{props.item.id}</button>
                
                <DeleteBtn setFlag={setFlag} item = {props.item}/>

            </div>
        
        ):(<></>)

    )

}

export default Item;