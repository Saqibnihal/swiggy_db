const { transaction } = require('objection');
const Order = require('../../model/orders');
const OrderItems = require('../../model/orderItems');
const handleError = require('../../modules/utils/errorHandling');
const MenuItems = require('../../model/menuItems');
const OrderStatus = require('../../model/orderStatuses');
const OrderStatusHistory = require('../../model/orderStatusHistory');


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
        const itemPrice = Number(dbItem.price);
        const itemTotal = item.quantity * dbItem.price

        return {
          menuItemId: item.menuItemId,
          quantity: item.quantity,
          itemPrice,
          total: itemTotal,
        };
      });

      const totalAmount = orderItems.reduce
        ((sum, item) => sum + item.quantity * item.itemPrice, 0);

      const order = await Order.query(trx).insert({
        userId,
        restaurantId,
        statusId,
        totalAmount
      });

      // orderitem table la insert panren
      await OrderItems.query(trx).insertGraph(
        orderItems.map(item => ({
          ...item,
          orderId: order.id
        }))
      );

      const state = changedBy || 'system'

      await OrderStatusHistory.query(trx).insertGraph({
        orderId: order.id,
        statusId,
        changedBy: state,

      })

      return order;

    });
    res.status(200).json({
      message: 'orders done',
      Order: newOrder
    })
  }
  catch (error) {
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
  const { userId } = req.params;
  try {
    const orders = await Order.query()
      .where('userId', userId)
      .withGraphFetched('[restaurant, orderStatus, orderItems]');

    res.status(200).json({ message: 'Thambi unnoda Past order pa', orders });
  } catch (error) {
    handleError(res, error);
  }
};

//view full history
exports.getFullhistoryOfUser = async (req, res) => {
  const { id: orderId } = req.params;
  if (!orderId) {
    return res.status(400).json({ message: "orderId is required in URL" });
  }
  try {
    const history = await OrderStatusHistory.query()
      .where('orderId', orderId)
      .withGraphFetched('status')
      .orderBy('changedAt');

    res.status(200).json({
      message: 'Order status history fetched',
      history,
    });

  } catch (error) {
    handleError(res, error);
  }
}


exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { restaurantId, statusId, items = [] } = req.body;

  try {
    // Check if the order already exists
    const existingOrder = await Order.query().findById(orderId);

    if (!existingOrder) {
      res.status(404).json({ message: 'please enter valid order id' })
    }

    if (existingOrder) {
      // Prevent updates if the order is cancelled
      const cancelledStatus = await OrderStatus.query().findOne({ code: 'CANCELLED' });
      if (existingOrder.statusId === cancelledStatus?.id) {
        return res.status(400).json({ message: 'Cancelled orders cannot be updated.' });
      }

      // Update order details (status or restaurant)
      const updated = await Order.query().patchAndFetchById(orderId, {
        restaurantId: restaurantId || existingOrder.restaurantId,
        statusId: statusId || existingOrder.statusId,
      });

      // If items are included, delete old and insert new order items
      if (items.length) {
        await OrderItems.query().delete().where('orderId', orderId);

        const menuItems = await MenuItems.query().whereIn(
          'id',
          items.map(i => i.menuItemId)
        );

        let totalAmount = 0;

        const orderItems = items.map(i => {
          const mi = menuItems.find(m => m.id === i.menuItemId);
          if (!mi) throw new Error(`Menu item not found: ${i.menuItemId}`);
          totalAmount += i.quantity * mi.price;
          return {
            orderId,
            menuItemId: i.menuItemId,
            quantity: i.quantity,
            itemPrice: mi.price,
          };
        });

        // Save new order items and update total
        await OrderItems.query().insert(orderItems);
        await Order.query().patch({ totalAmount }).where('id', orderId);
        updated.totalAmount = totalAmount;
      }

      return res.status(200).json({ message: 'Order updated', order: updated });
    }
  } catch (error) {
    handleError(res, error);
  }
};

// updateOrderStatusByRestaurants 
exports.updateOrderStatusByRestaurant = async (req, res) => {
  const { id: orderId } = req.params;
  const { statusId, changedBy } = req.body;

  try {
    const result = Order.transaction(async trx => {

      //inga order table la status update pannaporen
      const updateOrder = await Order.query().patchAndFetchById(orderId, { statusId })
      if (!updateOrder) throw new Error("Order not found");

      // inga orderHistory la updated status create panren
      const newHistory = await OrderStatusHistory.query(trx).insertAndFetch({
        orderId,
        statusId,
        changedBy
      });
      return { updateOrder, newHistory }
    });
    res.status(201).json({
      message: 'order status update Succesfully',
      order: (await result).updateOrder,
      statusHistory: (await result).newHistory
    })
  } catch (error) {
    handleError(res, error);
  }
}