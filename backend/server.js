const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const updateRoutes = require('./routes/update');
const deleteRoutes = require('./routes/delete');
const getRoutes = require('./routes/get');
const port = 5000;
const dbURI = process.env.MONGO_URI;
const Account = require('./models/Account');
const login = require("./routes/login");
const accountRoutes = require("./routes/accountroutes");
const signup = require("./routes/signup");
const middleware=require("./middleware/auth")

require("dotenv").config();
app.use(cors());
app.use(express.json()); 


mongoose.connect(dbURI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" Could not connect", err));
app.use('/post', postRoutes);     
app.use('/update', updateRoutes);    
app.use('/delete', deleteRoutes); 

app.use("/api/login", login);

app.use('/accounts', getRoutes); 


app.use("/api/accounts", accountRoutes);


app.use("/api/signup", signup);

app.get("/verify",middleware, async (req, res) => {
    return res.status(200).json({ 
        authenticated: true, 
        userId: req.user.id 
    });
});

app.listen(port, () => {
  console.log(`🚀 Server running: http://localhost:${port}`);
});