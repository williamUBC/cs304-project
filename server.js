const express = require('express'); 
const mysql = require('mysql');

const app = express(); 

// Init body parser 
app.use(express.json({extended: false}));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use("/api/init", require("./routes/init"));
app.use("/api/crud", require("./routes/crud"));