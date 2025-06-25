require('./db')
const express = require("express");
const app = express();
const orderRoutes = require("./modules/orders/orderRoutes");
const restaurantRoutes = require('./modules/restaurants/restaurantRoutes')
const PORT = 3000;

app.use(express.json());

app.use("/orders", orderRoutes);
app.use("/restaurant", restaurantRoutes);

app.listen(PORT, () => {
  console.log(`server starts at http://localhost:${PORT}`);
});
