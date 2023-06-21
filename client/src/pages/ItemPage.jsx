import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import BookingWidget from "../BookingWidget";
import ItemGallery from "../ItemGallary";

// work after clicking on a particular place in index page
export default function ItemPage(){
    const {id}=useParams();
    const [item,setItem]=useState(null);
    useEffect(()=>{
        if(!id){
            return;
        }
        else
        {
            axios.get(`/items/${id}`).then(response=>{
               setItem(response.data);
               console.log(response.data);
            })
        }
    },[id])

    if(!item) return'';


    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{item.title}</h1>
            <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com./?g='+item.address}>{item.address}</a>
            
            {/* TO DISPLAY IMAGES */}
             <ItemGallery item={item}/>

        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
           <div>
                <div className="my-4">
                    <h2 className="font-semibold text-2xl">Description</h2>
                    {item.description}
                </div>
                
                Max number of available items: {item.maxItems}<br/>
                Owned by : {item.ownerName}<br/>
                Contact : <a className="text-blue-500" href={`mailto:${item.ownerContact}`}>{item.ownerContact}</a>
                <br/>
                Category: {item?.category?.length > 0 && item.category.map(perk => (
                    <>
                    {perk}
                    </>
                       
                ))} 
            </div>
            <div>
                <BookingWidget item={item}/>
            </div>

        </div>
            
    </div>
    )
}