import { useContext } from "react";
import useItemDelete from "../../../hooks/useItemDelete";

import { ItemContext } from "../context/ItemContext";

const DeleteBtn = (props) => {

    const {items,setNewItems} = useContext(ItemContext); 

    const refreshItemList = () => {
        
        let cloneList = [...items];

        cloneList = cloneList.filter((valid_item) => valid_item !== props.item);

        setNewItems(cloneList);

    }

    const {deleteReq} = useItemDelete(props.item.id,refreshItemList);

    return (
        
        <button className="del-btn util-btn" onClick={()=> deleteReq()}><i className="fa-regular fa-trash-can" style={{"color": "#ffffff"}}></i> Delete</button>
    
    )
}

export default DeleteBtn;