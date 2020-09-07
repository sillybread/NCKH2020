exports.testAccess = (res, req) => {
  req.status(200).json({ message: res.userId });
};
