const Contato = require("../models/ContatoModel");

exports.cadastraContato = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash("errors", contato.errors);
      req.session.save(() => res.redirect("back"));
      return;
    }
    req.flash("success", "Contato registrado com sucesso");
    req.session.save(() => res.redirect("back"));
    return;
  } catch (err) {
    console.log(err);
    return res.render("404", {
      title: "Error 404",
      msg: err,
      code: err.code,
    });
  }
};


  
