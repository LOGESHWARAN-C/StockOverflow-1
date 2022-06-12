const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017";
let db;
MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db("stocks");
    console.log(`MongoDB Connected: ${url}`);
  }
);
const stocks = db.collection("stocks");
