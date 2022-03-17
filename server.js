const express = require("express");
const path = require("path");
const app = express();
const { data, User } = require("./db");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);
app.use(express.static(__dirname + "/public"));

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await User.findAll());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    res.status(201).send(await User.generateRandom());
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/users/:id", async (req, res, next) => {
  try {
    const asset = await User.findByPk(req.params.id);
    await asset.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

const start = async () => {
  try {
    await data();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server listening at PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
