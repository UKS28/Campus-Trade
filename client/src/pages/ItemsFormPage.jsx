
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import Category from "../Category";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";

export default function ItemsFormPage(){
    const {id}= useParams();
    console.log({id});
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState([]);
    const[description,setDescription]=useState('');
    const [category,setCategory]=useState([]);
    const [maxItems,setMaxItems]=useState(1);
    const [price,setPrice]=useState(100);
    const [redirect,setRedirect]=useState(false);

//USEEFFECT TO FILL VALUE IN EDITTED FORM
    useEffect(()=>{
      if(!id){
        return;
      }
      else{
        axios.get('/items/'+id).then(response=>{
            const{data}=response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setCategory(data.category);
            setMaxItems(data.maxItems);
            setPrice(data.price);
        })
      }
    },[])
    
    console.log(category);
    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header,description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        )
    }

   async function savePlace(ev){
        ev.preventDefault();
        const itemData={
            title, address, addedPhotos,
            description,category,maxItems,price
        }
        if(id)
        {
            // update
            await axios.put('/items',{
                id,...itemData
               
            });
            setRedirect(true);
        }
        else{
            // new place
        await axios.post('/items',{
          ...itemData
        });
        setRedirect(true);
        }
    }

     if(redirect){
        return <Navigate to={'/account/items'}/>
     }

    return(
      
                <div>
                <AccountNav/>
                <form onSubmit={savePlace}>
                    {preInput('Title for the Object','Title for your object ,should be short and cachy as in advertisement it helps')}
                      <input type="text" value={title} onChange={evt=>{setTitle(evt.target.value)}} placeholder="Name of the object ,eg. Scooty" />
                    
                    {preInput('Your Address','Enter your Hostel no along with room no. also ')}
                      <input type="text" value={address} onChange={evt=>{setAddress(evt.target.value)}} placeholder="Address"/>
                    
                    {preInput('Photos','Photos should be clear')}
                      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                    {preInput('Description','Enter short Description of the Object')}   
                      <textarea value={description} onChange={evt=>{setDescription(evt.target.value)}}/>

                      {/* category */}
                    {preInput('Category','select the category of the object')}
                      <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                       <Category selected={category} onChange={setCategory}/>
                      </div>

                    {preInput('Price and No. of the item','')}
                      
                      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">

                        <div>
                            <h3 className="mt-2 "> Number of Items</h3> 
                            <input type="number" 
                                    value={maxItems} 
                                    onChange={evt=>{setMaxItems(evt.target.value)}} 
                                    placeholder="5"/>
                        </div>
                        <div>
                        <h3 className="mt-2 "> Price Per item</h3> 
                            <input type="number" 
                                    value={price} 
                                    onChange={evt=>{setPrice(evt.target.value)}} 
                                    placeholder="in ₹ "/>
                        </div>
                      </div> 
                        {/* FINAL BUTTON */}
                    <button className="primary my-4">Save</button>
                      
                      
                </form>

                </div>
    )
}