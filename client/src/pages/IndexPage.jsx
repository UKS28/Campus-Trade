
import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";


export default function IndexPage(){
  const [items,setItems] = useState([]);
  const {itemName}=useContext(UserContext);
  
  useEffect(() => {
    console.log(itemName,'inside the useffect');
    axios.get('/items',{ params: { itemName: itemName } }).then(response => {
    setItems([...response.data]);
    });

  }, [itemName]);

  console.log(itemName, "out of index.js")


  return(
    // header componet
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* index page here */}
         
        {items.length >0 &&  items.map( item=>(
          <Link to={'/item/'+item._id} key={item.id}> 
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {item.photos?.[0]&&(
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+item.photos?.[0]}/>
              )}
            </div>
            <h2 className="font-bold">{item.title}</h2> 
            <h3 className="text-sm text-gray-500 ">{item.address}</h3>
            <div className="mt-1">
              <span className="font-bold">₹ {item.price}</span> per item
            </div>
            <div className="mt-1">Owner
              <span className="font-bold"> {item.ownerName}</span> 
            </div>
          </Link>
        ))}
    </div>
  )

}