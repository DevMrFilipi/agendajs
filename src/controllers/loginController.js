const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render("login", {title: "Faça login aqui!"});
    return;
}

exports.login = async (req, res) => {
    try {
      const login = new Login(req.body);
      await login.login();
      
      if (login.errors.length > 0) {
          req.flash('errors', login.errors);
          req.session.save(() => {
              return res.redirect('back');
          });
          return;
      }
          req.flash('success', 'Login efetuado com sucesso!');
          req.session.user = login.user;
          req.session.save(() => {
              return res.redirect('/');
          });
    } catch (err) {
      console.log(err);
      res.render('404', {
          title: "Error 404",
          msg: err,
          code: err.code,
      });
    }
  };

exports.logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
}
  