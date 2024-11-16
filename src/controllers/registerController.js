const Register = require("../models/RegisterModel");

exports.index = (req, res) => {
  res.render("register", { title: "Cadastre-se agora!" });
  return;
};

exports.register = async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.register();
    
    if (register.errors.length > 0) {
        req.flash('errors', register.errors);
        req.session.save(() => {
            return res.redirect('back');
        });
        return;
    }
        req.flash('success', 'Seu usuário foi registrado com sucesso!');
        req.session.save(() => {
            return res.redirect('back');
        });
  } catch (err) {
    console.log(err);
    res.render('404', {
        title: "Error 404",
        msg: err,
        code: err.code,
    })
  }
};
