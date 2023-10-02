import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

const ItemBox = () => {
    
    const {item} = useContext(ItemContext);

    return (

       <div>
            
            {item != null? (<p>{item.name}-{item.id}</p>):(<></>)}
       
       </div>
    
    )

}

export default ItemBox;