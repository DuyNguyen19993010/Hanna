import { useState } from "react";

// context

import { NavContext } from "../../context/NavContext";

const Nav = ({children}) => {

    let tabs_json = require("../../data/tabs-meta.json");

    const [tabsJson,setTab] = useState(tabs_json.tabs);

    const [toggle,setToggle] = useState(false);
    
    function selectTab(e){

        e.stopPropagation();

        const index = parseInt(e.target.id.split("-")[2]);

        let current_act = tabsJson[index].active;

        let copy = [...tabsJson];

        copy[index].active = !current_act; 

        setTab(copy);
    
    }

    function closeNav(e){

        e.stopPropagation();

        setToggle(false);
    
    }

    return (
            
        <div id = "router">
            
            {toggle? (
                <nav onClick={(e)=> closeNav(e)} id = "main-nav">

                    <ul onClick={(e)=> {e.stopPropagation()}} id = "main-ul-wrapper">

                        <i onClick={(e)=> closeNav(e)} id = "nav-close-btn" className="fa-solid fa-xmark"></i>

                        {

                            tabsJson.map(( tab, key ) => 
                                (
                                    <li id = {`${tab.name}-tab`} key = {`${tab.name}-tab`} className = "tab inactive-tab">

                                        <p onClick={(e) => selectTab(e)} id = {`nav-header-${key}`} key = {key} className = {`${tab.active? ("headers active-headers"):("headers inactive-headers")}`}><i onClick={function(e){e.stopPropagation()}}className={`tab-icon ${tab.icon}`}/>{tab.name}</p>
                                        
                                        {
                                            
                                            tab.active?(
                                                
                                                <ul id = {`${tab.name}-options`} className="options">

                                                    {
                                                    
                                                    tab.options.map(( option,o_key ) => 
                                                        (
                                                            
                                                            <li key = {o_key} className = 'sub-option inactive-sub-option active-sub-option' id = {`${option.name}-option`}> 
                                                                
                                                                <a key = {o_key} href = {`${tab.routePrefix}${option.route}`}> 
                                                                
                                                                    {option.name}
                                                                
                                                                </a> 
                                                            
                                                            </li>
                                                        
                                                        )
                                                    )

                                                    }

                                                </ul>
                                            
                                            ):(<></>)
                                        
                                        }

                                    </li>
                                
                                )
                            
                            )

                        }

                    </ul>

            </nav>):(<></>)}

            <NavContext.Provider value={{setToggle}}>

                {children}

            </NavContext.Provider>
        
        </div>
    )
}

export default Nav