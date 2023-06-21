import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext=createContext({});

export function UserContextProvider({children}){
    // FOR SEARCHING PURPOSE
    const [itemName,setItemName]=useState('');
    const [user,setUser]=useState(null);
    // ready state for account page
    const [ready,setReady]=useState(false);
    console.log(itemName,'from user context');
    useEffect(()=>{
      if(!user){
       axios.get('/profile')
       .then(({data})=>{
           setUser(data);
           setReady(true);
       })
       ;
      }
    },[])
    
    return(
        <UserContext.Provider value={{ready,user,setUser,itemName,setItemName}}>
            {children}
        </UserContext.Provider>
    );
}