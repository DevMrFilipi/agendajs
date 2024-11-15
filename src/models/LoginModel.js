const Register = require("../models/RegisterModel");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const register = new Register();
const RegisterModel = register.registerModel;

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validador();
    if (this.errors.length > 0) return;
    this.user = await RegisterModel.findOne({
      email: this.body.email,
    });
    if (!this.user) {
      this.errors.push("Login ou senha inválidos.");
      return;
    }
    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
        this.errors.push('Login ou senha inválidos.');
        this.user = null;
        return;
    }
  }
  validador() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido.");
    if (this.body.password.length < 5 || this.body.password.length > 20) {
      this.errors.push("Senha inválida.");
    }
  }
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login
