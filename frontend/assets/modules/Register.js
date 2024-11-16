const validator = require("validator");
import SvgRender from "./svgRender";
export default class Register {
  constructor(document) {
    this.document = document;
    this.form = this.document.querySelector(".form-register");
  }
  init() {
    let containerUnsuccess = this.document.querySelector(
      ".container-unsuccess"
    );
    let containerSuccess = this.document.querySelector(".container-success");

    this.eventForm();
    
    if (containerUnsuccess !== null) this.messageTimeOut(".container-unsuccess");
    if (containerSuccess !== null) this.messageTimeOut(".container-success");
  }
  eventForm() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validator(e);
    });
  }
  validator(e) {
    const el = e.target;

    const nameIn = el.querySelector('input[name="name"]').value;
    const emailIn = el.querySelector('input[name="email"]').value;
    const psswIn = el.querySelector('input[name="password"]').value;
    const confirmPsswIn = el.querySelector(
      'input[name="confirmPassword"]'
    ).value;
    let error = false;

    
    if (nameIn.length <= 2 || nameIn.length > 25) {
      this.alertMessage("O nome precisa ter entre 3 à 25 letras.");
      error = true;
      return;
    }
    if (!validator.isEmail(emailIn)) {
      this.alertMessage("O E-mail precisa ser válido.");
      error = true;
      return;
    }
    if (psswIn.length <= 4 || psswIn.length > 15) {
      this.alertMessage(
        "A senha precisa ter pelo menos 4 caracteres e no máximo 15."
      );
      error = true;
      return;
    }
    if (psswIn !== confirmPsswIn) {
      this.alertMessage("As senhas precisam ser iguais.");
      error = true;
      return;
    }
    if (!nameIn || !emailIn || !psswIn || !confirmPsswIn) {
      error = true;
      return;
    }

    if (!error) el.submit();
  }
  alertMessage(message) {
    this.createAlertMessage(message);
    this.messageTimeOut(".container-alert");
  }
  messageTimeOut(elClass) {
    if (typeof elClass !== "string") return;
    if (!this.document.querySelector(elClass)) return;
    setTimeout(() => {
      this.document.querySelector(elClass).remove();
    }, 4100);
  }
  createAlertMessage(message) {
    if (
      this.document.body.contains(
        this.document.querySelector(".container-alert")
      )
    ) {
      this.document.querySelector(".container-alert").remove();
    }
    const containerAlert = this.document.createElement("div");
    const svgRender = new SvgRender();

    containerAlert.setAttribute(
      "class",
      "container-alert flex justify-center animate-pulse items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    );
    containerAlert.setAttribute("role", "alert");

    containerAlert.innerText = `${message}`;
    this.document.querySelector(".alert-message").appendChild(containerAlert);
    containerAlert.insertAdjacentElement(
      "afterbegin",
      svgRender.createInfoSvg()
    );
  }
}
