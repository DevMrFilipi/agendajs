const validator = require("validator");
import SvgRender from "./svgRender";
export default class Home {
  constructor(document) {
    this.document = document;
    this.modalCadastrar = this.document.querySelector("#inserirContato");
  }
  init() {
    let btnInserirContato = this.document.querySelector("#btnInserirContato");
    let btnClsInserirContato =
      this.document.querySelector("#clsInserirContato");
    let btnCancelarInserirContato = this.document.querySelector(
      "#btnCancelarContato"
    );
    let containerUnsuccess = this.document.querySelector(
      ".container-unsuccess"
    );
    let containerSuccess = this.document.querySelector(".container-success");

    this.eventModal(
      this.modalCadastrar,
      btnInserirContato,
      btnCancelarInserirContato,
      btnClsInserirContato
    );
    this.eventDragElement(
      this.document.querySelector("#dragzoneInserir"),
      this.document.querySelector("#dragableInserir")
    );
    this.eventForm(this.document.querySelector(".form-cadastra-contato"));
    this.eventForm(this.document.querySelector(".form-edita-contato"));
    
    if (containerUnsuccess !== null) this.messageTimeOut(".container-unsuccess");
    if (containerSuccess !== null) this.messageTimeOut(".container-success");
    
  }
  eventForm(form) {
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validator(e);
    });
  }
  validator(e) {
    const el = e.target;
    const name = el.querySelector('input[name="name"]');
    const lastName = el.querySelector('input[name="lastName"]');
    const phone = el.querySelector('input[name="phone"]');
    const mail = el.querySelector('input[name="mail"]');
    let error = false;
    if(!name && !mail && !phone && !mail) {
      this.alertMessage("O cadastro precisa ter pelo menos um nome e um contato.");
      error = true;
      return;
    }
    if (name.value.length < 2 || name.value.length > 12) {
      this.alertMessage("O nome precisa ter entre 3 à 11 letras.");
      error = true;
      return;
    }
    if (lastName.value.length < 2 || lastName.value.length > 24) {
      this.alertMessage("O sobrenome precisa ter entre 2 à 24 letras.");
      error = true;
      return;
    }
    if (!phone.value.match(/(^\(?\d{2}\)?)\s?(\d{4,5}\-?\d{4})/g)) {
      this.alertMessage("O telefone precisa ser válido.");
      return;
    }
    if (!validator.isEmail(mail.value)) {
      this.alertMessage("O e-mail precisa ser válido.");
      error = true;
      return;
    }
    if (!mail.value && !phone.value) {
      this.alertMessage("O cadastro precisa ter pelo menos um contato.");
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
      this.document.querySelector(elClass).remove()
  }, 4000);
  }
  createAlertMessage(message) {
    if (
      this.document.body.contains(
        this.document.querySelector(".container-alert")
      )
    ) {
      this.document.querySelector(".container-alert").remove();
    }
    console.log(this.document.body.contains(this.document.querySelector(".container-alert")));
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
  eventModal(modal, btnConfirma, btnCancela, btnFecha) {
    if (!modal && !btnConfirma && !btnCancela && !btnFecha) return;

    btnConfirma.onclick = () => {
      modal.style.display = "block";
      return;
    };

    btnFecha.onclick = () => {
      modal.style.display = "none";
      return;
    };

    btnCancela.onclick = () => {
      modal.style.display = "none";
      return;
    };

    window.onclick = (ev) => {
      if (ev.target == modal) {
        modal.style.display = "none";
        return;
      }
    };
  }
  eventDragElement(dragzone, dragable) {
    if (!dragzone && !dragable) return;

    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    const dragMouseUp = () => {
      this.document.onmouseup = null;
      this.document.onmousemove = null;
    };

    const dragMouseMove = (e) => {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      dragzone.style.top = `${dragzone.offsetTop - pos2}px`;
      dragzone.style.left = `${dragzone.offsetLeft - pos1}px`;
    };

    const dragMouseDown = (e) => {
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;

      this.document.onmouseup = dragMouseUp;
      this.document.onmousemove = dragMouseMove;
    };
    dragable.onmousedown = dragMouseDown;
  }
}
