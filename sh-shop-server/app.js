const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);

const PORT = config.get("port");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "sh-shop-project")));

  const indexPath = path.join(__dirname, "sh-shop-project", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`MongoDB connected.`));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
}

start();
