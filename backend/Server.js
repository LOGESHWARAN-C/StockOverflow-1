import {
  insertItem,
  getAllItem,
  removeOutOfStock,
  purchaseItem,
  removeItem,
  addItem,
} from "./Function.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import formidable from "express-formidable";

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(formidable());

app.get("/", (req, res) => {
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.get("/all", (req, res) => {
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.get("/add/:id/:qty", (req, res) => {
  const id = parseInt(req.params.id);
  const qty = parseInt(req.params.qty);
  addItem(id, qty);
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.get("/purchase/:id/:qty", (req, res) => {
  const id = parseInt(req.params.id);
  const qty = parseInt(req.params.qty);
  purchaseItem(id, qty);
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.get("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  removeItem(id);
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.get("/remove_out_of_stock", (req, res) => {
  removeOutOfStock();
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.post("/new_item", (req, res) => {
  console.log(req.fields);
  insertItem(req.fields);
  getAllItem((err, doc) => {
    res.send(doc);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
