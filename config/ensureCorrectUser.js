module.exports = function(req, res, next) {
  const sessionUserID = req.session.user._id;
    if (sessionUserID !== req.params.id) return redirect(`/users/${sessionUserID}`);
  return next();
}
