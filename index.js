const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const quote = require("./model");
require("dotenv/config");
//bodyparser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", async (req, res, next) => {
  const docs = await quote.find();
  res.status(200).send(JSON.stringify({ message: "Found", quotes: docs }));
});

app.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const q = new quote({
      symbol: req.body.symbol,
      description: req.body.description,
      volume: req.body.volume,
      close: req.body.close,
      marketCap: req.body.marketCap,
    });
    const save = await q.save();
    console.log("Note created");
    res.status(200).send(JSON.stringify({ message: "Added" }));
  } catch (e) {
    res.status(404).json({ message: "Please input a valid note", error: e });
  }
});
app.delete("/:id", async (req, res, next) => {
  console.log(req.params.id);
  try {
    const doc = await quote.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(JSON.stringify({ message: "deleted" }));
    next();
  } catch (e) {
    res.status(404).json({ message: e });
    next();
  }
});
//connect to database
mongoose.connect(
  process.env.database_string,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to database");
  }
);
app.listen(process.env.PORT || 5000, () => {
  console.log("The server is running");
});
