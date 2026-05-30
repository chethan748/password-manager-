const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post');
const updateRoutes = require('./routes/update');
const deleteRoutes = require('./routes/delete');
const getRoutes = require('./routes/get');
const Account = require('./models/Account');
const login = require("./routes/login");
const accountRoutes = require("./routes/accountroutes");
const signup = require("./routes/signup");
const middleware = require("./middleware/auth");
const authRouter = require('./routes/forgotpass'); // Your forgot password router file

require('dotenv').config(); // Only need this once at the top

const port = 5000;
const dbURI = process.env.MONGO_URI;

// 1. CRUCIAL MIDDLEWARES (Must run BEFORE your routes)
app.use(cors());
app.use(express.json()); 

// 2. CONNECT TO DATABASE
mongoose.connect(dbURI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" Could not connect", err));

// 3. REGISTER YOUR ROUTERS
app.use('/post', postRoutes);     
app.use('/update', updateRoutes);    
app.use('/delete', deleteRoutes); 
app.use("/api/login", login);
app.use('/accounts', getRoutes); 
app.use("/api/accounts", accountRoutes);
app.use("/api/signup", signup);

// UNCOMMENTED AND MOVED HERE Safely under express.json()
app.use('/api/auth', authRouter); 

// 4. VERIFY SESSION PATH
app.get("/verify", middleware, async (req, res) => {
    return res.status(200).json({ 
        authenticated: true, 
        userId: req.user.id 
    });
});

app.listen(port, () => {
  console.log(`🚀 Server running: http://localhost:${port}`);
});