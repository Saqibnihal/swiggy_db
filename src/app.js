const express = require("express");
const app = express();
const routes = require("./routes/route");
const PORT = 7000;

app.use(express.json());

app.get("/", routes);

app.listen(PORT, () => {
  console.log(`server starts at http://localhost:${PORT}`);
});
