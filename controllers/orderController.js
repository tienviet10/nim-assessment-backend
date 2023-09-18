const Order = require("../db/models/orders.js");

const getAll = async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const order = await Order.getOne(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.update(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const order = await Order.remove(req.params.id);
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByCustomer = async (req, res) => {
  try {
    const orders = await Order.getByCustomer(req.params.id);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getByStatus = async (req, res) => {
  try {
    const orders = await Order.getByStatus(req.params.status);
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalSales = async (_, res) => {
  try {
    const orders = await Order.getTotalSales();
    if (!orders.length && !orders[0].total) {
      return res.status(500).send(0);
    }
    return res.send({ total: orders[0].total });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getOrdersByStatus = async (req, res) => {
  try {
    const status = req.query.s;
    const statusList = ["pending", "confirmed", "delivered", "cancelled"];

    if (!status || !statusList.includes(status)) {
      return res.status(500).send("Please provide a valid status");
    }

    const orders = await Order.ordersByStatus(status);

    return res.send(orders);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getByCustomer,
  getByStatus,
  getTotalSales,
  getOrdersByStatus
};
