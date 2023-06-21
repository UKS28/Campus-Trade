import { useContext, useState } from 'react';
import {Link}  from 'react-router-dom';
import { UserContext } from './UserContext';
export default function Header(){
    const {user}=useContext(UserContext);
    const {itemName,setItemName}= useContext(UserContext);

    console.log(itemName,'from header');
    
    // {console.log(user)}
    return (
        <header className='flex justify-between '>
        {/* ADDING LOGO */}
        <a href="/" className="flex items-center gap-1">
         
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>


          <span className="font-bold text-3xl">campusTrade</span>
        </a>
        


        {/* SEARCH WIDGET */}
        <div className='flex gap-2 border border-gray-500 p-2 px-4 rounded-full shadow-md shadow-gray-300'>
            <div>Any Time</div>
            <div className="border-l border-gray-300"></div>
            <div>Any Thing</div>
            <div className="border-l border-gray-300"></div>
            {/* <div >Any People</div> */}
            
              <input type='text'
                     value={itemName}
                     onChange={(ev)=> setItemName(ev.target.value) } 
                     placeholder='Search'/> 
            

            <button  className='bg-primary text-white my-2 h-10 w-15 p-1 rounded-2xl '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
        </div>

        {/* USER WIDGET */}
         <Link  to={(user && Object.keys(user).length !== 0)?'/account':'/login'} className='flex items-center border border-gray-300 rounded-full p-2 px-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 ">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
            {/* IF WE HAVE A USER NAME THEN DISPLAY USER NAME */}
          </div>
          {!!user && (
            <div className='text-xl p-1'>
              {user.name}
            </div>
          )}
          
         </Link> 

      </header>
    )
}