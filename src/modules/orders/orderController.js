const { transaction } = require('objection');
const Order = require('../../model/orders');
const OrderItems = require('../../model/orderItems');
const handleError = require('../../modules/utils/errorHandling');

exports.placeOrder = async (req, res) => {
  const { userId, restaurantId, statusId, items } = req.body;

  try {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.itemPrice,
      0
    );

    const newOrder = await transaction(Order.knex(), async (trx) => {
      // Insert the main order
      const order = await Order.query(trx).insert({
        userId,
        restaurantId,
        statusId,
        totalAmount,
      });

      // Prepare order items
      const orderItems = items.map((item) => ({
        orderId: order.id,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        itemPrice: item.itemPrice,
      }));

      // Insert into orderItems
      await OrderItems.query(trx).insert(orderItems);

      return order;
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
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
