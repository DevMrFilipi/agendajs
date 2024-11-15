const Contato = require("../models/ContatoModel");

// AgendaModel.find()
//     .then(data => console.log(data))
//     .catch(e => console.log(e));

exports.index = async (req, res) => { 
    try {
      console.log(req.session);
      const contatos = await Contato.buscaContato();
      console.log(contatos);
      res.render('index', {title: 'Agenda', contatos});
      return;
    } catch (err) {
      console.log(err);
      res.render('404', { title: "Error 404", msg: err, code: err.code, });
    }
}

exports.editarContato = async (req, res) => {
    try {
    if (!req.params.id) return res.render('404', { title: "Error 404", msg: err, code: err.code, });
    
    const contato = new Contato(req.body);
    await contato.editarContato(req.params.id);
    
    if(contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(() => res.redirect('back'));
    }
    if(!contato) return res.render('404', { title: "Error 404", msg: err, code: err.code, });

    req.flash('success', 'O contato foi editado com sucesso');
    req.session.save(() => res.redirect('back'));
  } catch (err) {
    res.render('404', { title: "Error 404", msg: err, code: err.code, });
  }
}

exports.deletarContato = async(req, res) => {
  try {
    if (!req.params.id) return res.render('404', { title: "Error 404", msg: err, code: err.code, });
    const contato = await Contato.deleteContato(req.params.id);
    if(!contato) return res.render('404', { title: "Error 404", msg: err, code: err.code, });
    
    req.flash('success', 'O contato foi apagado com sucesso');
    req.session.save(() => res.redirect('back'));

  } catch(err) {
    res.render('404', { title: "Error 404", msg: err, code: err.code, });
  }
}