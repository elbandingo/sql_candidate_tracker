const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const apiRoutes = require("./routes/apiRoutes");
//add the middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api',apiRoutes);

//listen for any url to be bad, give a 404
app.use((req,res) => {
    res.status(404).end();
});



//start the server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});