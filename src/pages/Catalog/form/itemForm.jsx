import { useEffect, useRef, useState } from "react";

// context

import { usePostItem } from "../../../hooks/usePostItem";

const ItemForm = (props) =>{

    // state

    const [img, setImg] = useState(null);

    // form inputs references
    const form = useRef(null);
    const name = useRef(null);
    const minQuan = useRef(null);
    const price = useRef(null);
    const file = useRef(null);

    // data

    const [fromData, setFormData] = useState(null);

    // post item data hook

    const [status] = usePostItem(fromData);

    // submit handler
    const submit = (e)=>{

        e.preventDefault();

        let data = new FormData();

        data.append('name',name.current.value);
        data.append('minQuan',minQuan.current.value);
        data.append('price',price.current.value);
        data.append('img',img);        

        setFormData(data);

    }

    useEffect(() => {

        
    
    },[status])

    return (
        <form ref = {form}  onSubmit = {(e)=>submit(e)} id = "add-item-form-wrapper">
            <div id = "add-item-form">
                
                <legend><h1><i className="fa-solid fa-plus"></i> Add an item</h1></legend>
                
                <div className="input-wrapper">       

                    <label className="input-label" htmlFor = "name"><h3>Name</h3></label>

                    <input ref = {name} type = "text" name = "name" placeholder="Please enter a name for the item"></input>

                </div>


                <div className="input-wrapper">

                    <label className="input-label" htmlFor = "minQuan"><h3>Minium quantity</h3></label>
                
                    <input ref = {minQuan} type = "text" name = "minQuan" placeholder="Minium quantity"></input>

                </div>

                <div className="input-wrapper">

                    <label className="input-label" htmlFor = "price"><h3>Price</h3></label>
                
                    <input ref = {price} type = "text" name = "price" placeholder="Please enter a price"></input>

                </div>

                
                <div className="input-wrapper">

                    <label className="input-label" htmlFor = "img"><h3>Image profile</h3></label>
                
                    <input multiple="multiple" onChange={(e)=>{setImg(e.target.files[0])}} ref = {file} type = "file" name = "img"></input>

                </div>

                <div id = "item-form-util-btns"> 

                    <button type="submit">Create item</button>

                    <button onClick = {() => props.setToggle(false)}className="cancel-btn">Cancel</button>

                </div>
                
            </div>
            
        </form>
    )
}

export default ItemForm;