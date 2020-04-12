const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

const MONGOLAB_URI = "mongodb+srv://glob:admin@123@cluster0-x5opa.mongodb.net/globavenueDB?retryWrites=true&w=majority"

mongoose.connect(MONGOLAB_URI, {useCreateIndex: true, useNewUrlParser: true})
.then(() => console.log('Mongodb connected.'))
.catch(e => console.log(e));
