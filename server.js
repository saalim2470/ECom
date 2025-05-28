require('dotenv').config()
const express = require('express')
const authRouter = require('./router/auth-route')
const categoryRouter = require('./router/category-router')
const productRouter = require('./router/product-router')
const app = express()
const connectDb = require('./utils/db')
const errorMiddlewear = require('./middleware/error-middleware')
const authorizeMiddleware = require('./middleware/authorize-middleware')
var cors = require('cors')
const port = 3000 || 4000

var corsOptions = {
    origin: 'https://ecomadmin-ag7s.onrender.com',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credential:true
}

//middlewears
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// routes
app.use('/api/auth', authRouter)
app.use('/api/category', authorizeMiddleware(), categoryRouter)
// app.use('/api/category',authorizeMiddleware('admin'), categoryRouter)
app.use('/api/product', authorizeMiddleware(), productRouter)
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/about', (req, res) => {
    res.status(200).send('Welcome now you about')
})

app.use(errorMiddlewear)
//server connection
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`server listen on ${port}`);
    })
})
