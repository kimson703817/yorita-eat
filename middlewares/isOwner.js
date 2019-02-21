module.exports = (req, res, next) => {
  const { owner_id } = req.body;
  const userId = req.user._id;
  if (owner_id !== userId) {
    return res
      .status(403)
      .send({ error: 'Only owners can perform this request' });
  }

  next();
};
