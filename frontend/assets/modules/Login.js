const validator = require("validator");
import SvgRender from "./svgRender";

export default class Login {
  constructor(document) {
    this.document = document;
    this.form = this.document.querySelector(".form-login");
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
    const email = el.querySelector('input[name="email"]').value;
    const pssw = el.querySelector('input[name="password"]').value;
    let error = false;

    if (email === "" || pssw === "") {
      this.alertMessage("E-mail ou senha inválidos.");
      error = true;
      return;
    }

    if (!email || !pssw) {
      this.alertMessage("E-mail ou senha inválidos.");
      error = true;
      return;
    }

    if (!validator.isEmail(email)) {
      this.alertMessage("E-mail ou senha inválidos.");
      error = true;
      return;
    }
    if (typeof pssw !== "string") {
      this.alertMessage("E-mail ou senha inválidos.");
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
    containerAlert.insertAdjacentElement(
      "afterbegin",
      svgRender.createInfoSvg()
    );
    this.document.querySelector(".alert-message").appendChild(containerAlert);
  }
}
