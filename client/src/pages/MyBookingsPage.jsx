import { useEffect, useState } from "react"
import axios from "axios";
import AccountNav from "../AccountNav";
import ItemImg from "../ItemImg";
import { Link } from "react-router-dom";
export default function MyBookingsPage() {
    const [bookings,setBooking]=useState([]);

    useEffect(()=>{
     axios.get('/bookings').then((response)=>{
        setBooking(response.data);
     })
    },[]);

    return (
        <div>
            <AccountNav/>
           <div>
            {bookings?.length>0 && bookings.map(booking=>(
                <Link to={`/account/bookings/${booking._id}`} className="flex my-4 gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-48">
                        <ItemImg item={booking.item}/>
                    </div>
                    <div className="py-3 pr-3 grow ">
                        <h2 className="text-xl ">{booking.item.title}</h2>
                        <div className="border-t border-gray-300 mt-2 py-2">
                          
                           Booked on :
                        </div>
                      
                        <div className="text-xl">
                          
                          Total price  :{booking.price}
                        </div>
                    </div>
                   
                    
                </Link>
              
            ))}
           </div>
        </div>

    )
}