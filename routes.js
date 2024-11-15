const exp = require("express");
const router = exp.Router();
const homeController = require("./src/controllers/homeController");
const contatoController = require("./src/controllers/contatoController");
const loginController = require("./src/controllers/loginController");
const registerController = require("./src/controllers/registerController");

const { loginRequired } = require("./src/middlewares/myMiddleware");

router.get("/register", registerController.index);
router.post("/register", registerController.register);

router.get("/login", loginController.index);
router.post("/login", loginController.login);
router.get("/login/logout", loginController.logout);

router.get("/", loginRequired, homeController.index);
router.post("/editarContato/:id", loginRequired, homeController.editarContato);
router.get("/deletarContato/:id", loginRequired, homeController.deletarContato);

router.post("/cadastraContato", contatoController.cadastraContato);


module.exports = router;
