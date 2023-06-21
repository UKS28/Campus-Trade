export default function PlaceImg({item,index=0,className=null}){ 
    if (!item.photos?.length)
    return '';
    if(!className) className='object-cover'
    return( 
            <img className={className} src={'http://localhost:4000/uploads/'+item.photos[index]} alt=""/>  
    )
}

