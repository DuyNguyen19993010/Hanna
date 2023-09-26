import { useState } from "react";

import useItemFetch from "../../../hooks/useItemFetch";

const ItemBox = (props) => {
    const {item} =  useItemFetch(props.item_id);
    
    return (

       <div>
    
            {props.item_id}
            {item != null? (<p>{item.name}</p>):(<></>)}
       
       </div>
    
    )

}

export default ItemBox;