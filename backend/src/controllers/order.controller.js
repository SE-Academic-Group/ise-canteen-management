const Order = require("../models/order.model");
const ControllerFactory = require("./controller.factory");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");
const TodayMenuItem = require("../models/todayMenuItem.model");
const Payment = require("../models/payment.model");
const User = require("../models/user.model");

exports.getAllOrders = ControllerFactory.getAll(Order, {
  populate: [
    {
      path: "orderItems.productId",
      select: "name image",
    },
    {
      path: "userId",
      select: "name email",
    },
  ],
  allowNestedQueries: ["userId"],
});
exports.getOrder = ControllerFactory.getOne(Order, {
  populate: [
    {
      path: "orderItems.productId",
      select: "name image",
    },
    {
      path: "userId",
      select: "name email",
    },
  ],
});
exports.createOrder = async (req, res, next) => {
  // Get user from req.user
  const orderItems = req.body;
  const totalPrice = orderItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const user = req.user;
  let userId, paymentMethod;
  if (user.role === "admin" || user.role === "cashier") {
    userId = undefined;
    paymentMethod = "cash";
  } else {
    userId = user.id;
    paymentMethod = "balance";
    // Check if user.balance >= totalPrice
    if (user.balance < totalPrice) {
      throw new AppError(
        400,
        "NOT_ENOUGH_BALANCE",
        "Số dư của bạn không đủ để thanh toán đơn hàng này",
        {
          balance: user.balance,
          totalPrice,
        }
      );
    }
  }

  let order;
  // For each orderItem, check if orderItem.quantity <= todayMenuItem.quantity
  // Use mongoose Session to rollback if any orderItem.quantity > todayMenuItem.quantity
  const session = await mongoose.startSession();
  // Substract all today
  try {
    session.startTransaction();
    for (const item of orderItems) {
      // findOneAndUpdate() is atomic on single document
      const updatedTodayMenuItem = await TodayMenuItem.findOneAndUpdate(
        { productId: item.productId, quantity: { $gte: item.quantity } },
        { $inc: { quantity: -item.quantity } },
        { new: true, session }
      );

      if (!updatedTodayMenuItem) {
        throw new AppError(
          400,
          "NOT_ENOUGH_QUANTITY",
          `Số lượng ${item.name} không đủ để đặt hàng`,
          {
            quantity: item.quantity,
            name: item.name,
          }
        );
      }
    }

    // Subtract user.balance if paymentMethod === "balance"
    if (paymentMethod === "balance") {
      await User.findByIdAndUpdate(
        user.id,
        { balance: user.balance - totalPrice },
        { new: true, runValidators: true }
      );
    }

    // After subtracting all todayMenuItem.quantity, create order
    order = await Order.create({
      orderItems,
      totalPrice,
      userId,
      orderStatus: "success",
    });

    // Create payment
    const payment = await Payment.create({
      orderId: order.id,
      paymentMethod,
      paymentStatus: "success",
      paymentAmount: totalPrice,
      discountAmount: 0,
    });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  // Populate order.orderItems.productId
  await order.populate({
    path: "orderItems.productId",
    select: "name image",
    options: { lean: true },
  });
  if (order.userId) {
    await order.populate({
      path: "userId",
      select: "name email",
      options: { lean: true },
    });
  }

  // Send response
  res.status(201).json({
    status: "success",
    data: order,
  });
};
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError(
      404,
      "NOT_FOUND",
      `Không tìm thấy order với ID ${req.params.id}`,
      {
        id: req.params.id,
      }
    );
  }

  if (order.orderStatus === "cancelled") {
    throw new AppError(
      400,
      "BAD_REQUEST",
      "Không thể cập nhật order đã bị hủy"
    );
  }

  if (order.orderStatus === "completed") {
    throw new AppError(
      400,
      "BAD_REQUEST",
      "Không thể cập nhật order đã hoàn thành"
    );
  }

  // if (order.orderStatus === "preparing") {
  // 	throw new AppError(
  // 		400,
  // 		"BAD_REQUEST",
  // 		"Không thể cập nhật order đang được chuẩn bị"
  // 	);
  // }

  const { orderStatus } = req.body;

  // Check if orderStatus is updated to "preparing" or "completed"
  if (orderStatus === "preparing" || orderStatus === "completed") {
    // Only admin or cashier or staff can update orderStatus to "preparing" or "completed"
    if (
      req.user.role !== "admin" &&
      req.user.role !== "cashier" &&
      req.user.role !== "staff"
    ) {
      throw new AppError(
        403,
        "FORBIDDEN",
        "Bạn không có quyền cập nhật trạng thái hoàn thành cho đơn hàng",
        {
          orderStatus,
        }
      );
    }

    order.orderStatus = orderStatus;
    await order.save();
  }

  // Check if orderStatus is updated to "cancelled"
  if (orderStatus === "cancelled") {
    // Start a transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1) Update orderStatus to "cancelled"
      order.orderStatus = orderStatus;
      await order.save({ session });

      // 2) Refund todayMenuItem.quantity
      for (const item of order.orderItems) {
        const refundedTodayMenuItem = await TodayMenuItem.findOneAndUpdate(
          { productId: item.productId },
          { $inc: { quantity: item.quantity } },
          { new: true, runValidators: true, session }
        );

        if (!refundedTodayMenuItem) {
          throw new AppError(
            404,
            "NOT_FOUND",
            `Không tìm thấy todaymenuitem với productId ${item.productId}`,
            {
              productId: item.productId,
            }
          );
        }
      }

      // 3) Refund user.balance
      if (order.userId) {
        const user = await User.findById(order.userId);
        user.balance += order.totalPrice;
        await user.save({ session });
      }

      // 4) Update paymentStatus to "cancelled"
      const payment = await Payment.findOneAndUpdate(
        { orderId: order.id },
        { paymentStatus: "cancelled" },
        { new: true, runValidators: true, session }
      );

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  // Populate order with orderItems.productId and userId
  await order.populate({
    path: "orderItems.productId",
    select: "name image",
    options: { lean: true },
  });
  if (order.userId) {
    await order.populate({
      path: "userId",
      select: "name email",
      options: { lean: true },
    });
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
};
exports.deleteOrder = ControllerFactory.deleteOne(Order);

// Middleware
exports.checkOrderOwnership = async (req, res, next) => {
  if (req.user.role === "admin" || req.user.role === "cashier") {
    return next();
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new AppError(
      404,
      "NOT_FOUND",
      `Không tìm thấy order với ID ${req.params.id}`,
      {
        id: req.params.id,
      }
    );
  }

  if (!order.userId || order.userId.toString() !== req.user.id) {
    throw new AppError(
      403,
      "FORBIDDEN",
      "Bạn không có quyền truy cập vào order của người khác"
    );
  }

  next();
};
