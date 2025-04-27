import express from 'express';
const app=express();
import router from './routes/routes.js';
import connectdb from './models/db.js';

// middleware for parsing the data 
app.use(express.json());

app.post("/api/v1/user/registration",()=>{
    console.log("hello");
})

app.use(router);
const serverstart=async ()=>{
    try{
   await   connectdb();
    app.listen(3000,()=>{
        console.log("server start");
    })
}catch(error){
    console.log("server fail");
    
}
}

serverstart();