const { coffee, order_detail, order_list } = require(`../models/index`);
const { Op } = require(`sequelize`);

exports.addOrder = async (req, res) => {
  try {
    const { cutomer_name, order_type, order_date, order_Detail } = req.body;

    // Buat entri OrderList baru
    const orderList = await order_list.create({
      cutomer_name,
      order_type,
      order_date,
    });

    // Iterasi melalui setiap detail pesanan dan buat entri OrderDetail
    for (const item of order_Detail) {
      const { coffee_id, price, quantity } = item;
      await order_detail.create({
        orderID: orderList.orderID,
        coffeeID : coffee_id,
        price,
        quantity,
      });
    }

    res.status(201).json({
      data: {
        id: orderList.orderID,
        cutomer_name,
        order_type,
        order_date,
      },
      message: "Order list has created",
    });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    let orders = await order_list.findAll({
      include: [{
        model: order_detail, 
        as: 'listOrderCoffe'
      }]
    });
    return res.json({
      success: true,
      data: orders,
      message: "Order list has retrieved"
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
