import {
  insertItem,
  getAllItem,
  removeOutOfStock,
  purchaseItem,
  removeItem,
  addItem,
} from "./Function.js";

 insertItem({ id: 2, name: "Item 2", qty: 5 });
// addItem(1,5);
// purchaseItem(1, 5);
// removeItem(2);

getAllItem((err, doc) => {
  console.log(doc);
});
