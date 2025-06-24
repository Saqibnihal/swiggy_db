
const OrderItems = require('../../model/orderItems')

exports.getOrderItems = async (req, res) => {
    try {
        const orderData = await OrderItems.query();
        res.status(200).json({ message: "Successfully Fetched Order Items", orderData })
    } catch (error) {
        res.status(500).json({ message: "Error in Fetching Order Items", error: error.message })
    }
}

exports.createOrderItem = async (req, res) => {
    const orderData = req.body;
    if (!orderData.orderId || !orderData.menuItemId || !orderData.quantity || !orderData.itemPrice || !orderData.total) {
        res.status(400).json({ message: 'Fill all the fields' })
    }
    try {
        const datas = await OrderItems.query().insert(orderData)
        res.status(200).json({ message: 'Successfully Created Order Items', datas })
    } catch (error) {
        res.status(500).json({ message: "Error in Creating Order Items", error: error.message })
    }
}

exports.updateOrderItem = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updated = await OrderItems.query().patchAndFetchById(id, updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'Order Item not found' });
        }
        res.status(200).json({ message: 'Successfully Updated Order Item', updated });
    } catch (error) {
        res.status(500).json({ message: "Error in Updating Order Item", error: error.message });
    }
};

exports.deleteOrderItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await OrderItems.query().deleteById(id);

        if (deleted === 0) {
            return res.status(404).json({ message: 'Order Item not found' });
        }

        res.status(200).json({ message: 'Successfully Deleted Order Item' });
    } catch (error) {
        res.status(500).json({ message: "Error in Deleting Order Item", error: error.message });
    }
};
