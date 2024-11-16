const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const HomeModel = require("./ContatoModel");
const RegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
});

const RegisterModel = new mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
    this.registerModel = RegisterModel;
  }

  async register() {
    this.validador();
    if (this.errors.length > 0) return;

    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await RegisterModel.create(this.body);
  }
  
  async userExists() {
    this.user = await RegisterModel.findOne({ email: this.body.email });

    if (this.user) this.errors.push("Esse usuário já existe.");
  }

  validador() {
    // O e-mail precisa ser válido
    // A senha precisa ter pelo menos 5 caracteres e no máximo 20
    // A senha precisa ter pelo menos 1 número, 1 Letra Maíuscula, 1 Caracter especial
    // A senha precisa ser idêntica ao confirmar senha
    this.cleanUp();
    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido.");
    if (this.body.password.length < 5 || this.body.password.length > 20) {
      this.errors.push("A senha precisa ter entre 5 e 20 caracteres.");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    if (this.body.password !== this.body.confirmPassword) {
      this.errors.push("As senhas precisam ser idênticas.");
    }
    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Register;
// module.exports = RegisterModel;
