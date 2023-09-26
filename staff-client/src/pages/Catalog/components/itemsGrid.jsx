// components

import Item from "./item";

const ItemsGrid = (props) => {

    return (
        <div id = "item-grid">
            {

                props.items.map((item,index)=>{
                    
                    return (

                        <Item item = {item} key = {index}/>

                    )
                
                })

            }  
        </div>

    )

}

export default ItemsGrid;