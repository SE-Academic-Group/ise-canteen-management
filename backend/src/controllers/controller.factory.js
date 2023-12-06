const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

exports.createOne = (Model) => async (req, res, next) => {
  const newDoc = await Model.create(req.body);

  res.status(201).json({
    status: "success",
    data: newDoc,
  });
};

exports.getAll = (Model) => async (req, res, next) => {
  // Allow nested routes
  if (req.params.userId) req.query.userId = req.params.userId;
  if (req.params.productId) req.query.productId = req.params.productId;

  // Allow filtering by today's date
  // Loops through query string, find any key that has a value of "today"
  // and replace it with an object that specifies the range of today's date
  Object.keys(req.query).forEach((key) => {
    if (req.query[key] === "today") {
      // Filter orders by today's date
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      req.query[key] = {
        $gte: today,
        $lt: tomorrow,
      };
    }
  });

  // If req.query contains "search", implement full text search
  if (req.query.search) {
    // Replace %20 with space
    req.query.search = req.query.search.replace(/%20/g, " ");
    // Filter by name start with search string
    req.query.name = {
      $regex: `^${req.query.search}`,
      $options: "i",
    };
  }

  // EXECUTE QUERY
  const features = new APIFeatures(Model.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const docs = await features.query;
  const count = await Model.countDocuments(features.filterObj);

  // SEND RESPONSE
  // Set X-Total-Count header
  res.set("Access-Control-Expose-Headers", "X-Total-Count");
  res.set("X-Total-Count", count);
  res.status(200).json({
    status: "success",
    data: docs,
  });
};

exports.getOne = (Model) => async (req, res, next) => {
  let query = Model.findById(req.params.id);
  const doc = await query;

  if (!doc) {
    throw new AppError(
      `Không tìm thấy document nào có ID ${req.params.id}`,
      404
    );
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

exports.updateOne = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    throw new AppError(
      `Không tìm thấy document nào có ID ${req.params.id}`,
      404
    );
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

exports.deleteOne = (Model) => async (req, res, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    throw new AppError(
      `Không tìm thấy document nào có ID ${req.params.id}`,
      404
    );
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
