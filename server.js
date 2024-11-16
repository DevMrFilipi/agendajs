require("dotenv").config();

const express = require("express");

const path = require("path");
const routes = require("./routes");
const MongoStore = require("connect-mongo");
const { globalMiddleware , checkServerError, csrfMiddleware } = require("./src/middlewares/myMiddleware");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const csrf = require("csurf");

const app = express();

async function conn() {
  await mongoose.connect(process.env.CONNSTR);
  console.log("200 - Connect to DB");
  app.emit("OK");
}
conn().catch((e) => console.log(e));

const sessionOpts = session({
  secret: "foo",
  store: MongoStore.create({ mongoUrl: process.env.CONNSTR }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(sessionOpts);
app.use(flash());
app.use(csrf());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(globalMiddleware);
app.use(checkServerError);
app.use(csrfMiddleware);
app.use(routes);

app.on("OK", () => {
  app.listen(3000, () => {
    console.log("200 - access: http://localhost:3000/login");
  });
});
