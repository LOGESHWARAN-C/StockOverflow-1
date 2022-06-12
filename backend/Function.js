import Stock from "./Stock.js";

export const insertItem = ({ id, name, qty }) => {
  const stock = new Stock({
    id,
    name,
    qty,
  });
  stock.save().then((err, doc) => {
    //console.log(doc);
  });
};

export const addItem = (id, qty) => {
  Stock.findOneAndUpdate({ id: id }, { $inc: { qty: qty } }, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
    }
  });
};

export const purchaseItem = (id, qty) => {
  Stock.findOneAndUpdate(
    { id: id },
    { $inc: { qty: -1 * qty } },
    (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(result);
      }
    }
  );
};

export const removeItem = (id) => {
  Stock.deleteMany({ id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(result);
    }
  });
};

export const removeOutOfStock = () => {
  Stock.find({ qty: 0 }).deleteMany(() => {});
};

export const getAllItem = (callback) => {
  Stock.find({}, callback);
};
