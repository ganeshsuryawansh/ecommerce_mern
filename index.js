// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name:String,
//     email:String
// });

// module.exports = mongoose.model('User',userSchema);










const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config();



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());





//---------------------DataBase Connection --------------------
// Connect to MongoDB (Make sure you have MongoDB running locally or provide a connection string)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas database.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// const itemRoutes = require('./routes/items');
// const signupRoutes = require('./routes/signup');
// // const loginRoutes = require('./routes/login');
// const addCartRoutes = require('./routes/addCart');

// app.use('/items', itemRoutes);
// app.use('/signup', signupRoutes);
// // app.use('/login', loginRoutes);
// app.use('/addCart', addCartRoutes);








const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);




// //------------------Product section-------------------------
// const ItemSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   description: String,
//   price: Number,
//   discountPercentage: Number,
//   rating: Number,
//   stock: Number,
//   brand: String,
//   category: String,
//   thumbnail: String,
//   images: [String],
// });

// const Item = mongoose.model("Item", ItemSchema);

//fetch product data
// async function fetchItems() {
//   try {
//     const items = await Item.find({});
//     // console.log(items);
//     return items;
//   } catch (err) {
//     console.error("Error fetching items:", err);
//   }
// }

// let products = fetchItems();

// //fetch products data from mongodb
// app.get("/", async (req, res) => {
//   try {
//     const items = await Item.find({});
//     res.json(items);
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.status(500).json({ errorMessage: error.message });
//   }
// });


//----------------------------user info -------------------------------------------
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true
//   },
//   pass: String,
//   address: String,
//   phone: String
// });

// const User = mongoose.model('User', userSchema);

// //Recive and store user information - Signup
// app.post('/send-data', async (req, res) => {
//   const data = req.body;
//   console.log(data);

//   // Create a new user instance with the received data
//   const user = new User({
//     name: data.name,
//     email: data.email,
//     pass: data.pass,
//     address: data.address,
//     phone: data.phone
//   });
//   try {
//     // Save the user instance to the database
//     await user.save();
//     res.json({ message: 'Data received and stored!' });
//   } catch (error) {
//     console.error("Error saving to database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, pass } = req.body;
//   try {
//     // Check if a user with the provided email exists
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Compare the provided password with the stored password
//     if (user.pass === pass) {
//       // This is a very basic way to do it. In a real-world scenario,
//       // you'd want to send a JWT (JSON Web Token) or some other form of session token.
//       res.json({ message: 'Login successful!' });
//     } else {
//       res.status(401).json({ message: 'Incorrect password.' });
//     }

//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });







//----------------------Cart details------------------------------------
// const CartSchema = new mongoose.Schema({
//   _pid: String,
//   email: String,
//   token: {
//     type: String,
//     unique: true
//   },
// });

// const Cart = mongoose.model('Cart', CartSchema);

// //Recive and store Cart information
// app.post('/Send-Cart', async (req, res) => {
//   const data = req.body;
//   console.log(data);

//   // Create a new Cart instance with the received data
//   const cart = new Cart({
//     _pid: data._pid,
//     email: data.email,
//     token: data._pid + "_" + data.email
//   });

//   try {
//     await cart.save();
//     res.json({ message: 'Data received and stored in Cart!' });
//   } catch (error) {
//     if (error.code === 11000) { // this error code stands for duplicate key error in MongoDB
//       return res.status(400).json({ message: 'Duplicate token. This product is already in the cart.' });
//     }
//     console.error("Error saving to database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }

// });















//------------------------------------25/9/2023-------------------------------------------------------------------------------------
// const express = require("express");
// const mongoose = require("mongoose");
// // const bodyParser = require('body-parser');
// const cors = require("cors");
// require("dotenv").config();


// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // app.use(bodyParser.json());


// //---------------------DataBase Connection --------------------
// // Connect to MongoDB (Make sure you have MongoDB running locally or provide a connection string)
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB Atlas database.");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB Atlas:", error);
//   });





// //------------------Product section-------------------------
// const ItemSchema = new mongoose.Schema({
//   id: Number,
//   title: String,
//   description: String,
//   price: Number,
//   discountPercentage: Number,
//   rating: Number,
//   stock: Number,
//   brand: String,
//   category: String,
//   thumbnail: String,
//   images: [String],
// });

// const Item = mongoose.model("Item", ItemSchema);

// // fetch product data
// async function fetchItems() {
//   try {
//     const items = await Item.find({});
//     // console.log(items);
//     return items;
//   } catch (err) {
//     console.error("Error fetching items:", err);
//   }
// }

// let products = fetchItems();

// //fetch products data from mongodb
// app.get("/", async (req, res) => {
//   try {
//     const items = await Item.find({});
//     res.json(items);
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.status(500).json({ errorMessage: error.message });
//   }
// });


// //----------------------------user info -------------------------------------------
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true
//   },
//   pass: String,
//   address: String,
//   phone: String
// });

// const User = mongoose.model('User', userSchema);

// //Recive and store user information - Signup
// app.post('/send-data', async (req, res) => {
//   const data = req.body;
//   console.log(data);

//   // Create a new user instance with the received data
//   const user = new User({
//     name: data.name,
//     email: data.email,
//     pass: data.pass,
//     address: data.address,
//     phone: data.phone
//   });
//   try {
//     // Save the user instance to the database
//     await user.save();
//     res.json({ message: 'Data received and stored!' });
//   } catch (error) {
//     console.error("Error saving to database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });



// // Login endpoint
// app.post('/login', async (req, res) => {
//   const { email, pass } = req.body;
//   try {
//     // Check if a user with the provided email exists
//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     // Compare the provided password with the stored password
//     if (user.pass === pass) {
//       // This is a very basic way to do it. In a real-world scenario,
//       // you'd want to send a JWT (JSON Web Token) or some other form of session token.
//       res.json({ message: 'Login successful!' });
//     } else {
//       res.status(401).json({ message: 'Incorrect password.' });
//     }

//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });



// //fetch complete user Details
// app.get('/fetch-user', async (req, res) => {
//   const email = req.query.email;  // Extract email from the query parameters

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required!' });
//   }

//   try {
//     const user = await User.findOne({ email: email });  // Find a user with the provided email

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching user from database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });






// //----------------------Cart details------------------------------------
// const CartSchema = new mongoose.Schema({
//   _pid: String,
//   email: String,
//   token: {
//     type: String,
//     unique: true
//   },
// });

// const Cart = mongoose.model('Cart', CartSchema);

// //Recive and store Cart information
// app.post('/Send-Cart', async (req, res) => {
//   const data = req.body;
//   console.log(data);

//   // Create a new Cart instance with the received data
//   const cart = new Cart({
//     _pid: data._pid,
//     email: data.email,
//     token: data._pid + "_" + data.email
//   });

//   try {
//     await cart.save();
//     res.json({ message: 'Data received and stored in Cart!' });
//   } catch (error) {
//     if (error.code === 11000) { // this error code stands for duplicate key error in MongoDB
//       return res.status(400).json({ message: 'Duplicate token. This product is already in the cart.' });
//     }
//     console.error("Error saving to database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// //Remove from cart one product with refrence to token
// app.post('/Remove-Cart', async (req, res) => {
//   const data = req.body;
//   console.log(data);

//   // Construct the token from the received data
//   // const tokenToRemove = data._pid + "_" + data.email;
//   const tokenToRemove = data.token;
//   try {
//     const result = await Cart.deleteOne({ token: tokenToRemove });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: 'No product found with the given token in the cart.' });
//     }

//     res.json({ message: 'Product successfully removed from the cart!' });
//   } catch (error) {
//     console.error("Error removing from database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });



// // Fetch all cart items for a specific email ID
// app.get('/Get-Cart', async (req, res) => {
//   const email = req.query.email; // assume you'll send email as a query parameter
//   console.log(email);
//   if (!email) {
//     return res.status(400).json({ message: 'Email is required!' });
//   }

//   try {
//     const items = await Cart.find({ email: email });
//     if (items.length === 0) {
//       return res.status(404).json({ message: 'No items found for the provided email!' });
//     }
//     res.json(items);
//     console.log(items);
//   } catch (error) {
//     console.error("Error fetching from database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });



// //-------------------------Payment details ------------------------------------------

// const PaymentSchema = new mongoose.Schema({
//   _pid: String,
//   email: String,
//   token: {
//     type: String,
//     unique: true
//   },
//   datetime: String,
//   Paymentid: String,
//   price: Number,
// });

// const Payment = mongoose.model('Payment', PaymentSchema);

// //Recive and store Payment information
// app.post('/Send-Payment', async (req, res) => {
//   const data = req.body;
//   console.log(data);

//   // Create a new Cart instance with the received data
//   const payment = new Payment({
//     _pid: data.pid,
//     email: data.email,
//     token: data.token,
//     datetime:data.datetime,
//     Paymentid: data.Paymentid,
//     price: data.price,
//   });

//   try {
//     await payment.save();
//     res.json({ message: 'Data received and stored in Payment!' });
//   } catch (error) {
//     if (error.code === 11000) { // this error code stands for duplicate key error in MongoDB
//       return res.status(400).json({ message: 'Duplicate token. This product is already in the cart.' });
//     }
//     console.error("Error saving to database:", error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });






// const PORT = 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );






















