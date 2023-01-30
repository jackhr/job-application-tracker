module.exports = function(req, res, next) {
  if (!req.user) {
    if (req.xhr) return res.json({ loggedOut: true });
    return res.redirect('/');
  }
  next();
};