const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
    default: "",
  },
  phone: {
    type: String,
    required: false,
    default: "",
  },
  mail: {
    type: String,
    required: false,
    default: "",
  },
  createIn: {
    type: Date,
    default: Date.now,
  },
});

const ContatoModel = new mongoose.model("Contato", ContatoSchema);

class Contato {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
  }
  static async deleteContato(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findByIdAndDelete(id);
    return contato;
  }
  static async buscaPorId(id) {
    if (typeof id !== "string") return;
    const contato = await ContatoModel.findById(id);
    return contato;
  }

  static async buscaContato() {
    const contatos = ContatoModel.find().sort({ createIn: -1 });
    return contatos;
  }

  async editarContato(id) {
    if (typeof id !== "string") return 
    this.validator();
    if(this.errors.length > 0) return;
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, { now: true });
  }

  async register() {
    this.validator();

    if (this.errors.length > 0) return;
    this.contato = await ContatoModel.create(this.body);
  }
  validator() {
    this.cleanUp();
  
    if (!this.body.name) this.errors.push("Nome do contato é obrigatório.");
    if (!this.body.mail && !this.body.phone)
      this.errors.push("Pelo menos um contato precisa ser informado.");
    if (this.body.mail && !validator.isEmail(this.body.mail))
        this.errors.push("E-mail inválido.");
  };
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      mail: this.body.mail,
      phone: this.body.phone,
    };
  };
}





module.exports = Contato;
