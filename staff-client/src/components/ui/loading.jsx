// components
import { LoadingSplash } from "./loadingSplash"

// context
import { PendingContext } from "../../context/PendingContext"

// style
import "../../assets/ui/css/app.css"
import { useState } from "react"

export const Loading = ({children}) => {

    const [isPending,setPending] = useState(false);

    return (
    <div id = "loading-wrapper">

        {isPending? (<LoadingSplash/>):(<></>)}
        {/* <LoadingSplash/> */}
        <PendingContext.Provider value={[isPending,setPending]}>

            {children}

        </PendingContext.Provider>
    
    </div>)
}
