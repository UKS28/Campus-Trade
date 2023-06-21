const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
// dotenv package allow us to use process.env.MONGO_USER directly
require('dotenv').config();
const User = require('./models/User.js');
const jwt=require('jsonwebtoken');
// to encrypt password to store in database
const bcrypt= require('bcryptjs');
// to read cook from respose.
const cookieParser=require('cookie-parser');
const imageDownloader=require('image-downloader');
const fs=require('fs');
const multer=require('multer');
const nodemailer = require("nodemailer");
// for generating a secret key
const bcryptSalt=bcrypt.genSaltSync(10);
const jwtSecret='fasefraw4r5r3wq45wdfgw34twdfg'
const Item=require('./models/Item.js');
const Booking=require('./models/Booking.js');

const app=express();


// json parser so than we can get  req.body
app.use(express.json());
// cookie parser so than we can get re.cookies
app.use(cookieParser());

app.use('/uploads', express.static(__dirname+'/uploads'));

// to make connection between server and client
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173',
}))

// password -l4gESO3pZxbqerBJ
console.log(process.env.MONGO_URL);
mongoose.set("strictQuery", false);


function getUserDataFromReq(req)
{
    const {token}=req.cookies;
    return new Promise((resolve,reject)=>{
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)throw err;
            resolve (userData);
        })
    })
}


mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        try {
            console.log('Connected to Database');
        } catch (err) {
            throw err;
        }
    });
    

    app.get('/test',(req,res)=>{
        res.json('test ok');
    });

    
    // endpoint of register 
    app.post('/register',async (req,res)=>{
        // grabing name email and password from req send on clicking register 
        const {name,email,password}=req.body;
        try{
            console.log("user doc🎈");
            
            const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt),
        });
        
        // res.json("hello");
        res.json(userDoc);
    }
    catch(e)
    {
        console.log("error",e);
        res.status(422).json(e);
    }
    
})
// ENDPOINT FOR LOGIN
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    // console.log("finding user");
    // console.log(email);
    
    const userDoc= await User.findOne({email:email});
        // console.log(userDoc);
        // we find the mail id in database
        // console.log("inside index.js for email check");
        // console.log(userDoc);
        if(userDoc!==null)
        {   
            const passOk=bcrypt.compareSync(password,userDoc.password);
            // if password in find
            if(passOk){
                jwt.sign({email:userDoc.email,id:userDoc._id},jwtSecret,{},(err,token)=>{
                    if(err)throw err;
                    // console.log("inside index.js for password check");
                    // console.log(userDoc);
                    res.cookie('token',token).json(userDoc);
                })
                // res.json('password ok');

            }
            
            else {
                // console.log('email or password not found');;
                res.status(422).json('password not found');
            }
            // res.json("found");
        }
        // not find mail id in dbs
        else
        {
            // console.log('email not found');
            res.status(422).json('email not found');
        }
    })
    
    // to check whether user is logged in or not  send from userContext
    app.get('/profile',(req,res)=>{
        const {token}=req.cookies;
        if(token){
            jwt.verify(token,jwtSecret,{},async (err,userData)=>{
                if(err)throw err;
                const {name,email,_id}=await User.findById(userData.id);
                const userDoc=await User.findById(userData.id);
                console.log(userDoc);
                // user contain only email and _id only so we are searching every thinng of user.
                res.json({name,email,_id});
            })
        }
        else
         res.json({});
    })
    
    
    app.post('/logout',(req,res)=>{
        res.cookie('token','').json(true);
    })
    //    console.log({__dirname})
    app.post('/upload-by-link',async (req,res)=>{
        const {link}=req.body;
        const newName='photo'+Date.now()+'.jpg';
        await imageDownloader.image({
            url:link,
            dest:__dirname+'/uploads/'+newName
        });
        res.json(newName);

    })

    const photosMiddleware=multer({dest:'uploads/'});
    // after uploading the photos
    app.post('/upload',photosMiddleware.array('photos',100),async (req,res)=>{
        // console.log(req.files)
        const uploadedFiles=[];
      for(let i=0;i<req.files.length;i++)
      {
        const {path,originalname}=req.files[i];
        const parts= originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path+'.'+ext;
        fs.renameSync(path,newPath);
        console.log(path, newPath , newPath.replace('uploads\\',' '))
        uploadedFiles.push(newPath.replace('uploads\\',''));
      }  
      res.json(uploadedFiles);   
    })


    // after submitting the addplaces in the form
    app.post('/items',(req,res)=>{
        const {token}=req.cookies;
        const {
            title,address,addedPhotos,description,
            category,maxItems,price
          } = req.body;

        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)throw err;
            console.log(userData);
            const {name,email}=await User.findById(userData.id);
            console.log(name);
            const placeDoc= await Item.create({
             owner:userData.id,
             ownerName:name,
             ownerContact:email,
             title,address,photos:addedPhotos,description,
             category,maxItems,price,
            })
            res.json(placeDoc);
        })

    })
 

    // display place for particular user
    app.get('/user-items',(req,res)=>{
        const {token}=req.cookies;
        jwt.verify(token,jwtSecret,{},async (err,userData)=>{
            if(err)throw err;
            const {id}=userData;            
            res.json(await Item.find({owner:id}));
        })
    })
    
    // return about each placee
   app.get('/items/:id',async (req,res)=>{
    res.json
    const{id}=req.params;
    console.log("hello from ",id);
    // console.log(typeof(id));
    res.json(await Item.findById(id));

   })
   
   // editing the form 
   app.put('/items',async (req,res)=>{

    const {token}=req.cookies;
    const {
        id,
        title,address,addedPhotos,description,
        category,maxItems,price,
      } = req.body;
    
      jwt.verify(token,jwtSecret,{},async (err,userData)=>{
          if(err)throw err;
          const placeDoc=await Item.findById(id);
         if(userData.id===placeDoc.owner.toString()){
          placeDoc.set({
            
            title,address,photos:addedPhotos,description,
            category,maxItems,price,
          })
          await placeDoc.save();
          res.json('ok');

          
         }
         
    })
   })
//    ORIGINAL
//    for index page to display places
//   app.get('/places',async (req,res)=>{
//     res.json(await Place.find());
// })


// MODIFIED:
app.get('/items',async (req,res)=>{
    const {itemName}=req.query;
    // console.log('inside request ',itemName);
     if(itemName==='' || itemName === undefined)
       {
           res.json(await Item.find());
       } 
    else
    {
        
        console.log(itemName);
        res.json(await Item.find({title:itemName}));
    }
})

// ORIGINAL
// app.post('/bookings',async (req,res)=>{
//     const userData=await getUserDataFromReq(req);
//     const {
//         place,checkIn,checkOut,numberOfGuests,name,phone,price,
//         }=req.body;
//     Booking.create({
//         place,checkIn,checkOut,numberOfGuests,name,phone,price,user:userData.id 
//     }).then((doc)=>{
//         res.json(doc);
//     }).catch((e)=>{
//         throw e;
//     });
// })

// Modified:
app.post('/bookings',async (req,res)=>{

    const userData=await getUserDataFromReq(req);
    const {
        item,checkIn,numberOfItems,name,phone,price,ownerContact
        }=req.body;
//    MAILING LOGIC:

let testAccount=await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lexus95@ethereal.email',
        pass: 'CzpfYD7QrMvbrjfQqy'
    }
});
  var mailOptions = {
    from: 'lexus95@ethereal.email',
    to:`${ownerContact}`,
    subject: 'Booked',
    text: 'One item is booked by someone',
    html:`
    <div style="padding:10px;border-style:ridge">
    <p>you have booking request</p>
    <ul>
    <li>name: ${name}</li>
    <li>contact no: ${phone}</li>
    </ul>
    </div>
    `
  };
  
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })


  // RETURNING BOOKING
    Booking.create({
        item,checkIn,numberOfItems,name,phone,price,user:userData.id 
    }).then((doc)=>{
        
        res.json(doc);
    }).catch((e)=>{
        throw e;
    });
})



app.get('/bookings',async (req,res)=>{
    // console.log('inside get booking');
   const userData= await getUserDataFromReq(req);
//    console.log(userData);
   res.json( await Booking.find({user:userData.id}).populate('item'));
// res.json(await Booking.find({user:userData.id}));
})

app.listen(4000);
    
    
    
    // const connectDB=async()=>{
        //     try{
            //         console.log("trying to connnect");
    //         await mongoose.connect(process.env.MONGO_URL);
    //         console.log('connected to db');
    //     }
    //     catch(err){
    //         console.log("failed to connect to mongodb");
    //     }
    // }


    // mongoose.connect(process.env.MONGO_URL);
    // const connectDB = async () => {
    //     console.log("trying to connect")
    //     const { connection } = await mongoose.connect(process.env.MONGO_URL);
    //     console.log(`MongoDB connected with ${connection.host}`);
    //   };
    
    // connectDB();
    // connectDB();