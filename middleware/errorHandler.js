const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "email or password required":
      res.status(400).json({
        success: false,
        error: {
          message: "email or password required",
        },
      });
      break;
    case "quote required":
      res.status(400).json({
        success: false,
        error: {
          message: "quote required",
        },
      });
      break;
    case "id is required":
      res.status(400).json({
        success: false,
        error: {
          message: "id is required",
        },
      });
      break;
    case "favorites is required":
      res.status(400).json({
        success: false,
        error: {
          message: "favorites is required",
        },
      });
      break;
    case "quote is not found":
      res.status(404).json({
        success: false,
        error: {
          message: "quote is not found",
        },
      });
      break;

    default:
      res.status(500).json(err);
      break;
  }
};

module.exports = {
  errorHandler,
};
