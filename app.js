require('dotenv').config({path: './env/.env'});
require('express-async-errors');


const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
// Configuration 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


const express = require('express');
const app = express();

const productRouter = require('./routes/productRoutes')


// database
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('/public'))
app.use(express.json())
app.use(fileUpload({useTempFiles:true}))

app.use('/api/v1/products/', productRouter)

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
