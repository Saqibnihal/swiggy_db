const { transaction } = require('objection');
const Order = require('../../model/orders');
const OrderItems = require('../../model/orderItems');
const handleError = require('../../modules/utils/errorHandling');
const MenuItems = require('../../model/menuItems');

exports.placeOrder = async (req, res) => {
  const { userId, restaurantId, statusId, items } = req.body;
  try {
    const newOrder = await transaction(Order.knex(), async (trx) => {
      const menuItemsFromDb = await MenuItems.query(trx).whereIn(
        'id',
        items.map(item => item.menuItemId)
      );

      const orderItems = items.map((item) => {
        const dbItem = menuItemsFromDb.find(mi => mi.id === item.menuItemId)

        if (!dbItem) {
          throw new Error(`Menu item not found: ${item.menuItemId}`)
        }
        return {
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          itemPrice: dbItem.price,
        };
      });

      const totalAmount = orderItems.reduce
        ((sum, item) => sum + item.quantity * item.itemPrice, 0);

      const order = await Order.query(trx).insert({
        userId,
        restaurantId,
        statusId,
        totalAmount
      })
      res.status(200).json({
        message:'orders done',
        Order:order
      })
    })
  } catch (error) {
    handleError(res, error);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.query()
      .findById(req.params.id)
      .withGraphFetched('[user, restaurant, orderStatus, orderItems]');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    handleError(res, error);
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.query()
      .where('userId', req.params.userId)
      .withGraphFetched('[restaurant, orderStatus, orderItems]');

    res.status(200).json({ orders });
  } catch (error) {
    handleError(res, error);
  }
};
