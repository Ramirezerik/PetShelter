const express = require("express");
const cors =require("cors");
const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:3000"
}));

// This will fire our mongoose.connect statement to initialize our database connection
require("./config/mongoose.config");
// This is where we import the users routes function from our user.routes.js file
require("./routes/pet.routes")(app);

app.listen(8000, () => (
    console.log("Listening on Port 8000")
    ))

//
