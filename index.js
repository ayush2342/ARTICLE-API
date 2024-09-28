require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./config/mongoose');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const port = process.env.PORT || 8000; 

app.use('/api/v1', userRoutes);
app.use('/api/v1', articleRoutes);

app.listen(port, function (error) {
    if (error) {
        console.log(`Error in running the Server. Error is: ${error}`);
        return;
    }
    console.log(`Server is up and running on the port: ${port}`);
});
