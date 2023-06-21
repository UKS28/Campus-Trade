import { useParams } from "react-router-dom"
import AccountNav from "../AccountNav"
import { useEffect, useState } from "react"
import axios from "axios";
import BookingDates from "../BookingDates";
import ItemGallery from "../ItemGallary";
import {differenceInCalendarDays, format} from "date-fns";

export default function BookingPage() {
    const {id}=useParams();
    const [booking,setBooking]=useState(null);
    useEffect(()=>{
       if(id){
        axios.get('/bookings')
        .then((response)=>{
         const foundBooking=  response.data.find(({_id})=>_id===id)
         if(foundBooking){
             setBooking(foundBooking);
             console.log(booking);
         }
        });
       }
    },[id]);

    if(!booking){
        return "";
    }
    return(
        <div className="my-8">
        <h1 className="text-3xl">{booking.item.title}</h1>
        
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-4">Your booking information:</h2>
            {/* <BookingDates booking={booking} /> */}
            <p>Booked on  {format(new Date(booking.checkIn), 'yyyy-MM-dd')}</p>
          </div>
          <div className="bg-primary p-6 text-white rounded-2xl">
            <div>Total price</div>
            <div className="text-3xl">${booking.price}</div>
          </div>
        </div>
        <ItemGallery item={booking.item} />
      </div>
    )
}
