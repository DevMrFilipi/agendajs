import "./assets/css/style.css";
import "regenerator-runtime";


import Home from './assets/modules/Home';
import Login from './assets/modules/Login';
import Register from "./assets/modules/Register";

const home = new Home(document);
const login = new Login(document);
const register = new Register(document);

try { 
    home.init();
    login.init();
    register.init();
} catch(e) {
    console.log(e);
}