require('./db')
const express = require("express");
const app = express();
const routes = require("./routes/route");
const PORT = 3000;

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`server starts at http://localhost:${PORT}`);
});
