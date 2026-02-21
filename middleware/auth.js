function validateUser(req, res, next) {
  const { name, uuid, rank } = req.query;

  if (!name || !uuid || !rank) {
    return res.status(400).send("Invalid request");
  }

  req.user = { name, uuid, rank };
  next();
}

module.exports = validateUser;