const routeNotFoundMiddleware = (req, res) =>
  res
    .status(400)
    .json({ message: `Sorry route does not exist check the URL: ${req.url}` });

module.exports = { routeNotFoundMiddleware };
