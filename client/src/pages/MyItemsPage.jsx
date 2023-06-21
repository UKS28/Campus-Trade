import { Link, useParams } from "react-router-dom"
import PlacesFormPage from "./ItemsFormPage";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import ItemImg from "../ItemImg";
export default function MyItemsPage(){
    
    const [items,setItems]=useState([]);

    useEffect(()=>{
      axios.get('/user-items').then(({data})=>{
        setItems(data);
      })  
    },[])


    return (
        <div>
            <AccountNav/>
             
            {/* Addition of places */}
              <div className="text-center">
               list of all added items 
               <br/>
              <Link className=" inline-flex bg-primary text-white py-2 px-6 rounded-full" to={'/account/items/new'}>
                  Add new Items
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              </Link>
          </div>

          {/* Showing the places after addition */}

          <div className="mt-4">
          {items.length>0 && items.map(item=>(
            <Link key={item._id} to={'/account/items/'+item._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl ">
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                
                  <ItemImg item={item}/>
                  
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{item.title}</h2>   
                  <p className="text-sm mt-2">{item.description}</p>
                  <p>₹ {item.price}</p>
                </div>
            </Link >
          ))}
          </div>
        </div>

    )
}