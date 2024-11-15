exports.globalMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}
exports.checkServerError = (err, req, res, next) => {
  if (err) {
    console.log(err);
      return res.render("404", {
      title: "Error 404",
      msg: "A unespected Error...",
      code: err.code,
    });
  } 
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer o login.');
    req.session.save(() => res.redirect('/login'));
    return;
  }
  next();
};