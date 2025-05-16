require('dotenv').config()
const express = require('express')
const authRouter = require('./router/auth-route')
const categoryRouter = require('./router/category-router')
const app = express()                             
const connectDb = require('./utils/db')
const errorMiddlewear = require('./middleware/error-middleware')
const authorizeMiddleware=require('./middleware/authorize-middleware')
const port = 3000



//middlewears
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routes
app.use('/api/auth', authRouter)
app.use('/api/category',authorizeMiddleware, categoryRouter)
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