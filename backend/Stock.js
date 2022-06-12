import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/data");

const StockSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const Stock = mongoose.model("Stock", StockSchema);
export default Stock;
