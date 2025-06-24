const Restaurant = require("../../model/restaurant")

exports.createRestaurants = async (req, res) => {
    try {
        const create = await Restaurant.query().insert(req.body)
        res.status(200).json({
            message: 'Restaurants created successfully',
            data: create,
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getRestaurants = async (req, res) => {
    try {
        const get = await Restaurant.query();
        res.status(200).json({
            message: 'All restaurant',
            restaurants: get,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateRestaurants = async (req, res) => {
    try {

        const id = req.params.id
        const data = req.body

        const exists = await Restaurant.query().findById(id)
        if (!exists) {
            return res.status(404).json({
                message: 'Restaurant not found'
            });
        }

        const update = await Restaurant.query().patchAndFetchById(id, data)
        res.status(200).json({
            message: 'Restaurant updated successfully',
            restaurant: update
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Restaurant.query().deleteById(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        res.status(200).json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRestaurantById = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurant.query().findById(id);
        if (!restaurant) {
            return res.status(404).json({
                message: 'Restaurant not found',
            });
        }
        res.status(200).json({
            message: 'Restaurant fetched successfully',
            data: restaurant,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

exports.getRestaurantWithMenu = async (req, res) => {

    try {
        const restaurant = await Restaurant.query().withGraphFetched('menuItems')
        if (!restaurant) {
            return res.status(404).json({
                message: 'Restaurant not found',
            });
        }

        res.status(200).json({
            message: 'All Restaurants and thier MenuItems',
            data: restaurant
        })

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
exports.getRestaurantWithMenuById = async (req, res) => {

    try {
        const id = req.params.id
        const restaurant = await Restaurant.query().findById(id).withGraphFetched('menuItems')
        if (!restaurant || restaurant.length === 0) {
            return res.status(404).json({
                message: 'No restaurants with menu items found',
            });
        }

        res.status(200).json({
            message: 'Restaurants and thier MenuItems',
            data: restaurant
        })

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}