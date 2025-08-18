import express from "express";

const app =express();
const port = 2404;

app.get('/',(req,res)=>{
res.send("hi")
})

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

