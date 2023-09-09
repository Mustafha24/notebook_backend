const express=require('express');
const env=require('dotenv').config()
const {conn}=require('./MODELS/dbconn')
const cors=require('cors')
const app=express()
const {user_route}=require('./ROUTES/user_route')
const {note_route}=require('./ROUTES/note_route')

conn()
app.use(cors())
app.use(express.json())

app.use('/auth',user_route)
app.use('/notes',note_route)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})