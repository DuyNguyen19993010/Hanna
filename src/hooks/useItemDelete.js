import { useContext } from "react";
import axios from "axios";

// context
import { PendingContext } from "../context/PendingContext";
const useItemDelete = (item_id,callback) => {
    
    const uri = `${process.env.REACT_APP_DELETE_ITEM_PATH}/${item_id}`;

    const [isPending,setPending] = useContext(PendingContext);

    const deleteReq = () => {
        
        setPending(true);
        
        axios.delete(uri).then((res)=>{

            callback();
            
        }).
        catch((err)=>{

            window.alert('Delete failed');

        }).finally(() => {

            setPending(false);
        
        })  

    }

    return {deleteReq};

}

export default useItemDelete;