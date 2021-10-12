const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

require('dotenv').config({
    path:'./config/index.env'
})

// MongoDB 
const connectDB = require('./config/db');
connectDB()

app.use(express.urlencoded({extended:false}))
app.use(express.json()); //Used to parse JSON bodiess
app.use(morgan('dev'))
app.use(cors())

// routes
app.use('/api/user/', require('./routes/auth.route'));
app.use('/api/category/', require('./routes/category.route'));
app.get('/', (req, res) => {
    res.send('====> oooaaa')
})

//page not found
app.use((req, res) => {
    res.status(404).json({
        msg:'page not founded'
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`)
})