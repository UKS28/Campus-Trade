import {useContext, useEffect, useState} from "react";

import axios from "axios";
import {Navigate} from "react-router-dom";
import {UserContext} from "./UserContext.jsx";

export default function BookingWidget({item}) {
  const [checkIn,setCheckIn] = useState('');
  const [numberOfItems,setnumberOfItems] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);


  console.log(new Date(checkIn),checkIn);


  async function bookItem() {
    console.log('trying to book');
    const response = await axios.post('/bookings', {
      checkIn,numberOfItems,name,phone,
      item:item._id,
      ownerContact:item.ownerContact,
      price:numberOfItems * item.price,
    });
    console.log(item);
    alert(`${item.title} is booked for you `);
    const bookingId = response.data._id;
    // console.log(item);
    console.log(`/account/bookings/${bookingId}`);
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }


  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ₹ {item.price} / per item
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Select Todays Date:</label>
            <input type="date"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of items requires (less than available):</label>
          <input type="number"
                 value={numberOfItems}
                 onChange={ev => setnumberOfItems(ev.target.value)}/>
        </div>
       
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        
      </div>
      <button onClick={bookItem} className="primary mt-4">
        Book the item
        
          <span> ${numberOfItems * item.price}</span>
        
      </button>
    </div>
  );
}