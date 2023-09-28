import {createContext, memo} from 'react';
// components

import Item from "./item";

export const ItemsContext = createContext();

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

export const ItemsGridMemo = memo(ItemsGrid);