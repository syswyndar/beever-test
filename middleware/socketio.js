module.exports = (io) => {
  return (req, res, next) => {
    // console.log(io)
    req.socket = io;
    next();
  };
};
