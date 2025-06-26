const Restaurant = require("../../model/restaurant");
const Order = require("../../model/orders");
const handleError = require("../utils/errorHandling");

exports.createRestaurants = async (req, res) => {
  try {
    const create = await Restaurant.query().insert(req.body);
    res.status(200).json({
      message: "Restaurants created successfully",
      data: create,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const get = await Restaurant.query();
    res.status(200).json({
      message: "All restaurant",
      restaurants: get,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.updateRestaurants = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const exists = await Restaurant.query().findById(id);
    if (!exists) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const update = await Restaurant.query().patchAndFetchById(id, data);
    res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: update,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Restaurant.query().deleteById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await Restaurant.query().findById(id);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      message: "Restaurant fetched successfully",
      data: restaurant,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// exports.getRestaurantWithMenu = async (req, res) => {

//     try {
//         const restaurant = await Restaurant.query().withGraphFetched('menuItems')
//         if (!restaurant) {
//             return res.status(404).json({
//                 message: 'Restaurant not found',
//             });
//         }

//         res.status(200).json({
//             message: 'All Restaurants and thier MenuItems',
//             data: restaurant
//         })

//     } catch (error) {
//         handleError(res, error)
//     }
// }
// exports.getRestaurantWithMenuById = async (req, res) => {

//     try {
//         const id = req.params.id
//         const restaurant = await Restaurant.query().findById(id).withGraphFetched('menuItems')
//         if (!restaurant || restaurant.length === 0) {
//             return res.status(404).json({
//                 message: 'No restaurants with menu items found',
//             });
//         }

//         res.status(200).json({
//             message: 'Restaurants and thier MenuItems',
//             data: restaurant
//         })

//     } catch (error) {
//         handleError(res, error)
//     }
// }
exports.getOpenRestaurants = async (req, res) => {
  try {
    const openRestaurants = await Restaurant.query().where("isOpen", true);

    if (!openRestaurants.length) {
      return res
        .status(400)
        .json({ message: "There is no Restaurants Opened" });
    }
    res.status(201).json({
      message: "indha restaurant ellam open la iruku order pannunga",
      restaurants: openRestaurants,
    });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getOrdersForRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.query()
      .where("restaurantId", id)
      .withGraphFetched("[user, orderItems, orderStatus]");

    if (!orders.length) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }

    res.status(200).json({
      message: "Orders for the restaurant which are placed",
      orders,
    });
  } catch (error) {
    handleError(res, error);
  }
};
