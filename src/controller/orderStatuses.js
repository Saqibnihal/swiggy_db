
const OrderStatus = require('../model/orderStatuses')

exports.GetOrderStatus = async (req, res) => {
    try {
        const status = await OrderStatus.query();
        res.status(200).json({ message: "Successfully Fetched Order Status", status })
    } catch (error) {
        res.status(500).json({ message: "Error in Fetching Order Status", error: error.message })
    }
}

exports.CreateOrderStatus = async (req, res) => {
    const orderData = req.body;

    if (!orderData.code || !orderData.label || !orderData.orderIndex) {
        return res.status(400).json({ message: 'Fill all the fields' })
    }
    try {
        const datas = await OrderStatus.query().insert(orderData)
        res.status(200).json({ message: 'Successfully Created Order Status', datas })
    } catch (error) {
        res.status(500).json({ message: "Error in Creating Order Status", error: error.message })
    }
}

exports.UpdateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const updated = await OrderStatus.query().patchAndFetchById(id, updatedData);
        if (!updated) {
            return res.status(404).json({ message: 'Order Status not found' });
        }
        res.status(200).json({ message: 'Successfully Updated Order Status', updated });
    } catch (error) {
        res.status(500).json({ message: "Error in Updating Order Status", error: error.message });
    }
}

exports.DeleteOrderStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await OrderStatus.query().deleteById(id);

        if (deleted === 0) {
            return res.status(404).json({ message: 'Order Status not found' });
        }

        res.status(200).json({ message: 'Successfully Deleted Order Status' });
    } catch (error) {
        res.status(500).json({ message: "Error in Deleting Order Status", error: error.message });
    }
};