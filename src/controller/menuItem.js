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
exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = MenuItems.query()
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