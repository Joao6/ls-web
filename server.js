const express = require('express');
const app = express();
app.use(express.static('./app/'));
app.listen(process.env.PORT || 8080, () => console.log("Server running on port 8080!"));
