const MenuItems = require("../model/menuItems");

exports.createmenuItems = async (req, res) => {
    try {
        const items = req.body;
        const menus = await MenuItems.query().insert(items);
        res.status(200).json({
            message: 'menuItems created Sucesfully',
            menuItems: menus
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItems.query()
        res.status(200).json({
            message: 'All Restaurants MenuItems',
            menuItems: menuItems
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.getMenuItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await MenuItems.query().findById(id)
        if (!item) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({
            message: 'Fethed Menu Item Food',
            Food: item
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.updateMenuItem = async (req, res) => {

    try {
        const id = req.params.id;
        const data = req.body;
        const exists = await MenuItems.query().findById(id)
        if (!exists) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        const updated = await MenuItems.query().patchAndFetchById(id, data)
        res.status(200).json({
            message: 'Menu item updated successfully',
            data: updated
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.deleteMenuItem = async (req, res) => {

    try {
        const id = req.params.id
        const deleteMenu = await MenuItems.query().deleteById(id)

        if (!deleteMenu) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        res.status(200).json({
            message: 'deleted menuItem'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

exports.getMenuWithRestaurants = async (req, res) => {
    try {
        const MenuItem = await MenuItems.query().withGraphFetched('restaurants')
        if (!MenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({
            message: 'All Menu Items With thier Restaurants',
            Menus: MenuItem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
exports.getMenuWithRestaurantsById = async (req, res) => {
    try {
        const id = req.params.id
        const MenuItem = await MenuItems.query().findById(id).withGraphFetched('restaurants')
        if (!MenuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({
            message: 'Menu Items With thier Restaurants',
            Menu: MenuItem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}