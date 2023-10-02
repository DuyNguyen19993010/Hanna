// module
import { useContext } from "react";

// context
import { ItemContext } from "../context/ItemContext";

// component
import DeleteBtn from "./deleteBtn";
import EditBtn from "./editBtn";

const Item = (props) => {

    // setter & getter for selected item

    const [item,setItem] = useContext(ItemContext);

    return(

        <div className = "item" id = {`item-${props.item.id}`}>

            <div className = "info-wrapper">


                <div className="item-profile">

                    <img src = "https://images.unsplash.com/photo-1682167176169-c74f2a6c6b84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1916&q=80" alt = "image was not loaded"/>

                </div>
                
                <div className="item-info">

                    <h3 className="item-name">{props.item.name}</h3>

                    <h4 className="item-minimum">Minimum quantity: {props.item.minquan}</h4>

                    <h4 className="item-price">Price: {props.item.price}</h4>

                    <button className="item-detail-btn" onClick={()=>{setItem(props.item)}}>Detail</button>

                </div>
            
            </div>

            <div className = "item-util-wrapper">

                <EditBtn item = {props.item}/>

                <DeleteBtn item = {props.item}/>

            </div>            
            
        </div>

    )

}

export default Item;