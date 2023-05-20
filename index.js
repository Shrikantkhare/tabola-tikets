const express = require('express');
var bodyParser = require('body-parser');
const mongoose=require('mongoose')
const route = require('./routes/route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Shrikantkhare1:Shrikant@cluster0.qch0g.mongodb.net/tambola-tikets?retryWrites=true&w=majority", {
    useNewUrlParser: true

})
.then(() => { console.log('MongoDB is Connected ') })
.catch(err => { console.log('Error connecting to MongoDB: ' + err) });

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
